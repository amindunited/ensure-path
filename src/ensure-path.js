/**
 * @license
 * Copyright Robin Buckley. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ensure = async (fullPath) => {

  // Handle './' at the beginning of the path
  let substring = 0;
  if (fullPath.indexOf('./') === parseInt(0) ) {
    substring = 2;
  }

  const accumulator = (substring === 2) ? '.' : false;
  const directoryPaths = [];

  /**
   * Break up the string into an array of paths
   */
  const directories = fullPath
    .substring(substring).split('/')
    .reduce((acc, dir) => {

      const dirPath = (acc !== false) ? acc + '/' + dir : dir;

      // the accumulator can give us an empty string at first; we don't want to use that
      if (dir.length) {
        directoryPaths.push(dirPath);
      }
      return dirPath;
    }, accumulator);

  for (let dir of directoryPaths) {

    // console.log('Ensure - trying to create ', dir);
    const promise = new Promise((resolve, reject) => {

      if (fs.existsSync(dir)) {

        resolve(dir);

      } else {

        fs.mkdir(dir, (err) => {

          if (err) {
            // If the folder already exists it will throw an error...
            // but we consider this a success
            if (err.code === 'EEXIST') {
              return resolve(dir);
            }
            return reject(err);
          }
          // Istanbul marks this code as not being covered,
          // only if the folders already exist (ie were not deleted after the last time the tests ran)
          /* istanbul ignore next */
          resolve(dir);
        });
      }

    });

    await promise;

  }

  return directoryPaths;
}

module.exports = ensure;
