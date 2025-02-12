// generate.js
const fs = require("fs");

// Simulación de payload
const payload = process.argv[2]
  ? JSON.parse(process.argv[2])
  : { text: "Contenido por defecto" };

console.log("Generando HTML con el siguiente contenido:", payload);

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Deploy desde GitHub Actions</title>
</head>
<body>
  <h1>${payload.text}</h1>
  <p>Generado automáticamente con GitHub Actions.</p>
</body>
</html>
`;

fs.writeFileSync("./out/index.html", htmlContent);
console.log("Archivo index.html generado en la carpeta ./out");
