const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para obtener la lista de archivos de audio disponibles
app.get('/audios', (req, res) => {
  // Obtiene la lista de archivos de audio disponibles en la carpeta
  const audioFolder = 'audios/';
  const audioFiles = fs.readdirSync(audioFolder);

  // Envía la lista de archivos al cliente
  res.send(audioFiles);
});

// Ruta para descargar un archivo de audio
app.get('/audios/:filename', (req, res, next) => {
  const { filename } = req.params;
  const filePath = path.join('audios/', filename);

  // Verifica si el archivo existe
  if (fs.existsSync(filePath)) {
    // Envía el archivo de audio al cliente para su descarga
    res.download(filePath, err => {
      if (err) {
        console.error('Error al descargar el archivo:', err);
        next(err);
      }
    });
  } else {
    // El archivo no existe, envía una respuesta de error
    res.status(404).send('Archivo no encontrado');
  }
});


// Ruta para procesar el texto ingresado por el usuario
app.post('/process', (req, res) => {
  const { text } = req.body;
  const pythonScriptPath = 'main.py';

  // Ejecuta el programa Python con el texto y la ruta de salida como argumentos
  const pythonProcess = spawn('python3', [pythonScriptPath, text]);

  pythonProcess.stdout.on('data', data => {
    console.log('Salida del programa Python:', data.toString());
  });

  pythonProcess.stderr.on('data', data => {
    console.error('Error en el programa Python:', data.toString());
  });

  res.send('Proceso Python iniciado.');
});

// Configuración del servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});

