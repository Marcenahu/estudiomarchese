const fs = require("fs");
const path = require("path");

async function generateSite() {
  try {
    const outputDir = path.join(__dirname, "out");

    // Crear el directorio 'out' si no existe
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // Contenido básico para el archivo HTML
    const content = `
      <html>
        <head>
          <title>Prueba de Generación Estática</title>
        </head>
        <body>
          <h1>¡Hola, Lautaro! 🚀</h1>
          <p>Este archivo fue generado automáticamente con generate.js.</p>
        </body>
      </html>
    `;

    // Crear el archivo index.html en la carpeta 'out'
    fs.writeFileSync(path.join(outputDir, "index.html"), content);

    console.log("Archivo estático generado exitosamente en /out/index.html");
  } catch (error) {
    console.error("Error al generar el sitio:", error);
  }
}

// Ejecutar la función de generación
generateSite();
