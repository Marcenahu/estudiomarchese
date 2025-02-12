// generate.js
const fs = require("fs");

// Supón que recibes datos como un objeto
const data = process.argv.slice(2)[0]; // Toma el primer argumento de la línea de comandos (que sería la información enviada)
const parsedData = JSON.parse(data); // Parsear los datos si son en formato JSON

// Aquí iría el proceso para generar los archivos estáticos (por ejemplo, `index.html`)
const outputPath = "./out/index.html";
const content = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Site</title>
</head>
<body>
  <h1>Generated Content</h1>
  <p>${parsedData.text}</p> <!-- Usa los datos enviados en el POST -->
</body>
</html>
`;

fs.mkdirSync("./out", { recursive: true });
fs.writeFileSync(outputPath, content);

console.log("Site generated!");
