const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se subio ninguna imagen.');
  }
  res.send({ file: req.file });
});

module.exports = router;
