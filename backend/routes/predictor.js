const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const path = require('path');
const iconv = require('iconv-lite');
const multer = require('multer');
const fs = require('fs');

// Configuración para almacenar el archivo temporalmente
const upload = multer({ dest: path.join(__dirname, '..', 'uploads') });

router.post('/', upload.single('archivoArff'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se ha subido ningún archivo .arff' });
  }

  const tempPath = req.file.path;
  const wekaPath = path.join(__dirname, '..', 'weka');
  const finalPath = path.join(wekaPath, 'entrada.arff');

  // Mover el archivo subido a la carpeta weka como entrada.arff
  fs.rename(tempPath, finalPath, (err) => {
    if (err) {
      console.error('Error al mover el archivo:', err);
      return res.status(500).json({ error: 'Error al preparar el archivo .arff' });
    }

    const javaProcess = spawn('java', [
      '--add-opens', 'java.base/java.lang=ALL-UNNAMED',
      '-cp', 'weka.jar;mtj-0.9.14.jar;.',
      'Predictor',
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
          .split('\r\n') // separa por línea
          .filter(line => line.trim() !== ''); // elimina líneas vacías

        res.json({ resultado });
      } else {
        res.status(500).json({ error: 'Error ejecutando el predictor' });
      }
    });
  });
});

module.exports = router;






