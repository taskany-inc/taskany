/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const { spawn } = require('child_process');
const { join } = require('path');

console.log(join(process.cwd(), 'node_modules', '@taskany', 'tracker-ui'));

// FIXME: so hard, so so
const issues = spawn('node_modules/@taskany/tracker-ui/node_modules/.bin/next', [
    'start',
    'node_modules/@taskany/tracker-ui',
    '-p',
    process.env.TASKANY_ISSUES_PORT,
]);

issues.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

issues.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

issues.on('error', (error) => {
    console.log(`error: ${error.message}`);
});

issues.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});
