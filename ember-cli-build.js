'use strict';

const GlimmerApp = require('@glimmer/application-pipeline').GlimmerApp;
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

module.exports = function(defaults) {
  let app = new GlimmerApp(defaults, {
    // Add options here
    rollup: {
      plugins: [
        resolve({ jsnext: true, module: true, main: true }),
        commonjs()
      ]
    }
  });

  return app.toTree();
};
