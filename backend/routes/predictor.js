const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const path = require('path');
const iconv = require('iconv-lite');
const multer = require('multer');
const fs = require('fs');

const upload = multer({ dest: path.join(__dirname, '..', 'uploads') });

router.post('/', upload.single('archivoArff'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se ha subido ningún archivo .arff' });
  }

  const tempPath = req.file.path;
  const wekaPath = path.join(__dirname, '..', 'weka');
  const finalPath = path.join(wekaPath, 'entrada.arff');

  fs.rename(tempPath, finalPath, (err) => {
    if (err) {
      console.error('Error al mover el archivo:', err);
      return res.status(500).json({ error: 'Error al preparar el archivo .arff' });
    }

    // Leer archivo ARFF para estadísticas
    fs.readFile(finalPath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error leyendo el archivo ARFF:', err);
        return res.status(500).json({ error: 'Error al leer el archivo .arff' });
      }

      const lines = data.split('\n').filter(line => !line.startsWith('%') && !line.startsWith('@'));
      const stats = {
        total: 0,
        sexCount: {},
        breedCount: {},
        colorCount: {}
      };

      lines.forEach(line => {
        const parts = line.trim().split(',');
        if (parts.length < 4) return; // evitar errores si hay líneas vacías

        const sexo = parts[0];
        const raza = parts[1];
        const color = parts[2];

        stats.total++;

        stats.sexCount[sexo] = (stats.sexCount[sexo] || 0) + 1;
        stats.breedCount[raza] = (stats.breedCount[raza] || 0) + 1;
        stats.colorCount[color] = (stats.colorCount[color] || 0) + 1;
      });

      const sexoPorcentajes = {};
      for (const sexo in stats.sexCount) {
        sexoPorcentajes[sexo] = ((stats.sexCount[sexo] / stats.total) * 100).toFixed(2) + '%';
      }

      const razaMasAdoptada = Object.entries(stats.breedCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
      const colorMasComun = Object.entries(stats.colorCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

      const javaProcess = spawn('java', [
        '-cp', process.platform === 'win32' ? 'weka.jar;mtj-0.9.14.jar;.' : 'weka.jar:mtj-0.9.14.jar:.',
        'Predictor',
        'modelo.model',
        'entrada.arff'
      ], { cwd: wekaPath });

      let output = '';
      javaProcess.stdout.on('data', (data) => {
        output += iconv.decode(data, 'windows-1252');
      });

      javaProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      javaProcess.on('close', (code) => {
        if (code === 0) {
          const resultado = output
            .split('\r\n')
            .filter(line => line.trim() !== '');

            res.json({
              resultado,
              estadisticas: {
                porcentajePorSexo: sexoPorcentajes,
                razaMasAdoptada: razaMasAdoptada,
                colorComunNombre: colorMasComun
              }
            });
            
        } else {
          res.status(500).json({ error: 'Error ejecutando el predictor' });
        }
      });
    });
  });
});

module.exports = router;






