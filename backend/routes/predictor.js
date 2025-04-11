const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const path = require('path');
const iconv = require('iconv-lite');
const multer = require('multer');
const fs = require('fs');

// Arrays de mapeo
const razas = ['Russian Blue', 'Norwegian Forest', 'Chartreux', 'Persian', 'Ragdoll', 'Ocicat', 'Abyssinian', 'Oriental', 'Egyptian Mau', 'American Shorthair', 'Bengal', 'Cornish Rex', 'British Shorthair', 'Burmese', 'Singapura', 'Maine Coon', 'Turkish Angora', 'Himalayan', 'Sphynx', 'Manx', 'Birman', 'Siberian'];
const colores = ['Tortoiseshell', 'Brown', 'Sable', 'Tabby', 'Blue', 'Calico', 'White', 'Black', 'Red', 'Pointed', 'Tricolor', 'Cream'];
const sexos = ['Female', 'Male'];

const upload = multer({ dest: path.join(__dirname, '..', 'uploads') });

router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No se ha subido ningún archivo .arff' });

  const tempPath = req.file.path;
  const wekaPath = path.join(__dirname, '..', 'weka');
  const finalPath = path.join(wekaPath, 'entrada.arff');

  fs.rename(tempPath, finalPath, (err) => {
    if (err) return res.status(500).json({ error: 'Error al preparar el archivo .arff' });

    fs.readFile(finalPath, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ error: 'Error al leer el archivo .arff' });

      const lines = data.split('\n').filter(line =>
        !line.startsWith('%') && !line.startsWith('@') && line.trim() !== ''
      );

      const stats = { total: 0, sexCount: {}, breedCount: {}, colorCount: {}, ageSum: 0, ageCount: 0 };

      lines.forEach(line => {
        const parts = line.trim().split(',');
        if (parts.length < 4) return;

        // Normalizar sexo
        const rawSexo = parts[0].trim().toLowerCase();
        let sexo = 'Desconocido';
        if (rawSexo === '0' || rawSexo === 'female') sexo = 'Female';
        else if (rawSexo === '1' || rawSexo === 'male') sexo = 'Male';

        const raza = razas[parseInt(parts[1])] || 'Desconocido';
        const color = colores[parseInt(parts[2])] || 'Desconocido';
        const edad = parseFloat(parts[3]) || 0; // Edad

        stats.total++;
        stats.sexCount[sexo] = (stats.sexCount[sexo] || 0) + 1;
        stats.breedCount[raza] = (stats.breedCount[raza] || 0) + 1;
        stats.colorCount[color] = (stats.colorCount[color] || 0) + 1;

        // Sumar la edad
        stats.ageSum += edad;
        stats.ageCount++;
      });

      const sexoPorcentajes = {};
      for (const s in stats.sexCount) {
        sexoPorcentajes[s] = ((stats.sexCount[s] / stats.total) * 100).toFixed(2) + '%';
      }

      const razaPorcentajes = {};
      for (const r in stats.breedCount) {
        razaPorcentajes[r] = ((stats.breedCount[r] / stats.total) * 100).toFixed(2) + '%';
      }

      const colorPorcentajes = {};
      for (const c in stats.colorCount) {
        colorPorcentajes[c] = ((stats.colorCount[c] / stats.total) * 100).toFixed(2) + '%';
      }

      const razaMasAdoptada = Object.entries(stats.breedCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
      const colorMasComun = Object.entries(stats.colorCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

      const edadPromedio = stats.ageCount > 0 ? (stats.ageSum / stats.ageCount).toFixed(2) : 'N/A';

      const javaProcess = spawn('java', [
        '-cp', process.platform === 'win32' ? 'weka.jar;mtj-0.9.14.jar;.' : 'weka.jar:mtj-0.9.14.jar:.',
        'Predictor', 'modelo.model', 'entrada.arff'
      ], { cwd: wekaPath });

      let output = '';
      javaProcess.stdout.on('data', data => {
        output += iconv.decode(data, 'windows-1252');
      });

      javaProcess.stderr.on('data', data => {
        console.error(`stderr: ${data}`);
      });

      javaProcess.on('close', code => {
        if (code === 0) {
          const lineas = output.split('\r\n').filter(line => line.trim() !== '');
          const resultados = [];
          const conteoSexo = { Male: 0, Female: 0 };

          lineas.forEach(line => {
            const match = line.match(/Predicción:\s*(\d+),\s*(\d+),\s*(\d+)/);
            if (match) {
              const [_, razaIdx, colorIdx, sexoIdx] = match.map(Number);
              const raza = razas[razaIdx] || 'Desconocido';
              const color = colores[colorIdx] || 'Desconocido';
              const sexo = sexos[sexoIdx] || 'Desconocido';

              resultados.push({ raza, color, sexo });

              if (sexo === 'Male') conteoSexo.Male++;
              else if (sexo === 'Female') conteoSexo.Female++;
            }
          });

          const totalPred = conteoSexo.Male + conteoSexo.Female;
          const porcentajeSexoPred = {
            Male: totalPred ? ((conteoSexo.Male / totalPred) * 100).toFixed(1) + '%' : '0%',
            Female: totalPred ? ((conteoSexo.Female / totalPred) * 100).toFixed(1) + '%' : '0%'
          };

          res.json({
            predicciones: resultados,
            estadisticas: {
              porcentajePorSexo: sexoPorcentajes,
              porcentajePorSexoPredicho: porcentajeSexoPred,
              porcentajePorRaza: razaPorcentajes,
              porcentajePorColor: colorPorcentajes,
              razaMasAdoptada: razaMasAdoptada,
              colorMasComun: colorMasComun,
              edadPromedio: edadPromedio
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
