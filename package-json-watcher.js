const fs = require('fs');
const { exec } = require('child_process');
// eslint-disable-next-line
const { Spinner } = require('cli-spinner');
const moment = require('moment');

(() => {
  const spinner = new Spinner('processing.. %s');
  spinner.setSpinnerString('|/-\\');

  console.log('Start watching package.json');

  fs.watchFile('package.json', () => {
    console.log('Found changes in package.json. Installing npm dependencies...');
    spinner.start();

    exec('npm install', (err, stdout) => {
      const timestamp = moment().format();
      if (err) {
        console.error(err);
        spinner.stop();
      } else {
        console.log(`stdout: ${stdout}`);
        fs.writeFile('./src/tmp.js', timestamp, (error) => {
          if (error) {
            console.log(error);
          }
          spinner.stop();
        });
      }
    });
  });
})();
