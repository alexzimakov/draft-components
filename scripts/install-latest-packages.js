import { spawn } from 'node:child_process';

function exec(command, args) {
  return new Promise((resolve, reject) => {
    let stdout = '';
    let stderr = '';
    const subprocess = spawn(command, args);
    subprocess.stdout.on('data', (data) => {
      stdout += data;
    });
    subprocess.stderr.on('data', (data) => {
      stderr += data;
    });
    subprocess.on('error', (err) => {
      reject(err);
    });
    subprocess.on('close', (code) => {
      resolve({ stdout, stderr, code });
    });
  });
}

const npmOutdatedResult = await exec('npm', ['outdated', '--json']);
const outdatedPackages = JSON.parse(npmOutdatedResult.stdout);
const packages = Object.entries(outdatedPackages).map(([
  pkg,
  pkgInfo,
]) => `${pkg}@${pkgInfo.latest}`);

if (packages.length > 0) {
  await exec('npm', ['install', ...packages]);
  console.log('Updated packages:');
  for (const [pkg, pkgInfo] of Object.entries(outdatedPackages)) {
    console.log(`- ${pkg}@${pkgInfo.current} → ${pkgInfo.latest}`);
  }
} else {
  console.log('Nothing to install, all packages are updated.');
}
