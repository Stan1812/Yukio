'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-yukio:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ someAnswer: true });
  });

  it('creates config files', () => {
    assert.file([
      'webpack.config.js',
      'package.json',
      '.babelrc',
      'index.html',
    ]);
  });
});
