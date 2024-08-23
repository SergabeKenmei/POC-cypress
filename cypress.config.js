const { defineConfig } = require("cypress");

// Función para obtener una marca de tiempo formateada
function getTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  // Retorna el formato `YYYY-MM-DD HH:MM:SS`
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions:{
    reportDir: 'cypress/reports',
    reportFilename: 'report',
    overwrite:false,                                       // No sobreescribe reportes anteriores
    reportTitle:`Test Report - ${getTimestamp()}`,         // Titulo del report personalizado
    charts:true,                                           // Graficos si
    embeddedScreenshots:true,                              // Capturas directamente en el informe
    saveHtml: true,                                        // Guardar el HTML generado
    timestamp:true                                         // Añadir timestamp al nombre del informe
  },

  e2e: {
    baseUrl:"https://tf-spain.dev.kenmei.ai/",
    testIsolation:false,
    defaultCommandTimeout:(3000),
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      
    },
  },
});
