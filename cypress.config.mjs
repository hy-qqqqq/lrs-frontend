import { defineConfig } from 'cypress';
import tsNode from 'ts-node';

tsNode.register({
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs'
  }
});

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:4173'
  },
});
