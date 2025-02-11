const fs = require("fs");
const path = require("path");

// Aquí estarían los datos recibidos del POST (simulados como ejemplo)
const postData = {
  message: "Nuevo mensaje desde el POST",
  timestamp: new Date().toLocaleString(),
};

// Ruta para modificar el HTML
const outDir = path.join(__dirname, "out");
const htmlFilePath = path.join(outDir, "index.html");

// Leer el archivo HTML original
let htmlContent = fs.readFileSync(htmlFilePath, "utf-8");

// Modificar el contenido del HTML con los nuevos datos
htmlContent = htmlContent.replace(
  "<p>Este archivo fue generado automáticamente</p>",
  `<p>Mensaje recibido: ${postData.message}</p>
   <p>Hora del mensaje: ${postData.timestamp}</p>`
);

// Guardar el archivo HTML actualizado
fs.writeFileSync(htmlFilePath, htmlContent);

console.log("Archivo index.html actualizado con el nuevo mensaje");
