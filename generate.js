const fs = require("fs");
const path = require("path");

async function generateSite() {
  try {
    const outputDir = path.join(__dirname, "out");

    // Crear el directorio 'out' si no existe
    if (!fs.existsSync(outputDir)) {
      console.log("Creando directorio /out");
      fs.mkdirSync(outputDir);
    }

    // Copiar el archivo index.html existente a la carpeta 'out'
    const sourceFile = path.join(__dirname, "index.html");
    const destinationFile = path.join(outputDir, "index.html");

    if (fs.existsSync(sourceFile)) {
      fs.copyFileSync(sourceFile, destinationFile);
      console.log("index.html copiado exitosamente a /out");
    } else {
      console.error("index.html no encontrado en la raíz del proyecto");
    }
  } catch (error) {
    console.error("Error al generar el sitio:", error);
  }
}

// Ejecutar la función de generación
generateSite();
