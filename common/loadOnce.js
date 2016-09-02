'use strict';

const fs = require('fs');
const _ = require('lodash');
const _u = require('./util');

let files = fs.readdirSync('./models');

_.each(files, (file) => {
  if (!/.js$/.test(file)) {
    return;
  }
  let modelName = file.replace('.js', '');
  console.log('load model:', modelName);
  _u.model(file);
});
