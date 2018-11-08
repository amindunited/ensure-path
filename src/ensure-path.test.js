/**
 * @license
 * Copyright Robin Buckley. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
'use strict';

const fs = require('fs');
const ensure = require('./index');
const expect = require('chai').expect

const expectedContent = 'Hey';
const testFilePath = './mv-file-promise-test-file.js';
const resultFilePath = './mv-file-promise-result-file.js';

describe('Ensure Path', () => {

  it('should export a function', () => {
    expect(ensure).to.be.a('function');
  });

  it('should handle an error', (done) => {
    const successFn = () => { expect(false).to.equal(true); }
    const errorFn = () => { expect(true).to.equal(true); done(); }
    ensure('/you/cant/write/this/dir')
      .then(successFn, errorFn);
  });

  it('should handle existing paths', (done) => {
    const successFn = () => { expect(true).to.equal(true); done(); }
    const errorFn = () => { expect(false).to.equal(true); done(); }
    ensure('./src/fs-utils/ensure-path')
      .then(successFn, errorFn);
  });

  it('should create file paths', (done) => {
    const successFn = (directories) => {

      expect(directories).to.deep.equal(['./tmp', './tmp/ensure-test', './tmp/ensure-test/fs-utilsies']);

      if ( fs.existsSync('./tmp/ensure-test/fs-utilsies') ) {
        expect(true).to.equal(true);
        done();
      } else {
        expect(false).to.equal(true);
        done();
      }
    }
    const errorFn = () => { expect(false).to.equal(true); done(); }
    ensure('./tmp/ensure-test/fs-utilsies')
      .then(successFn, errorFn);
  });

});
