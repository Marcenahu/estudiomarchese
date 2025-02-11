const fs = require("fs");
const path = require("path");

// Crear la carpeta 'out' si no existe
const outDir = path.join(__dirname, "out");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

// Generar el contenido del archivo HTML
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Page</title>
</head>
<body>
  <h1>¡Test exitoso desde GitHub Actions! 🎉</h1>
  <p>Este archivo fue generado automáticamente por <code>generate.js</code>.</p>
  <p>Hora de generación: ${new Date().toLocaleString()}</p>
</body>
</html>
`;

// Escribir el archivo index.html en la carpeta 'out'
fs.writeFileSync(path.join(outDir, "index.html"), htmlContent);

console.log("Archivo index.html generado con éxito en la carpeta ./out");
