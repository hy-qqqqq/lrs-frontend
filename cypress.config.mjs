import { defineConfig } from 'cypress';
import tsNode from 'ts-node';
import mochawesome from 'cypress-mochawesome-reporter/plugin';

tsNode.register({
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs'
  }
});

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      mochawesome(on);
    },
    baseUrl: 'http://localhost:4173',
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true
    }
  },
});
