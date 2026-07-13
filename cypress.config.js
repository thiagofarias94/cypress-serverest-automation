const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    video: true,
    screenshotsFolder: 'cypress/screenshots',
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',
      cypressMochawesomeReporterReporterOptions: {
        reportDir: 'cypress/reports/html',
        overwrite: false,
        html: true,
        json: true,
        charts: true,
        embeddedScreenshots: true,
        inlineAssets: true,
      },
      mochaJunitReporterReporterOptions: {
        mochaFile: 'cypress/reports/junit/results-[hash].xml',
        toConsole: false,
      },
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
    defaultCommandTimeout: 10000,
    retries: {
      runMode: 1,
      openMode: 0,
    },
  },
  env: {
    apiBaseUrl: 'https://serverest.dev',
  },
});
