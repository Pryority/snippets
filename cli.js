import inquirer from 'inquirer';
import path from 'path';
import { fileURLToPath } from 'url';
import { readdir, readFile } from 'fs/promises';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scriptsDir = path.join(__dirname, 'scripts');

async function run() {
  try {
    const days = await readdir(scriptsDir);
    const { dayNum } = await inquirer.prompt([
      {
        type: 'list',
        name: 'dayNum',
        message: "Which day's program should run:",
        choices: days,
      },
    ]);
    const scriptPath = path.join(scriptsDir, dayNum, 'main.js');

    const scriptContent = await readFile(scriptPath, 'utf-8');
    console.log(`Code from Day ${dayNum.substring(3)}:\n`, scriptContent); // Use backticks for string interpolation

    const script = await import(scriptPath);
    console.log("___________________________________________");
    console.log("------ P R O G R A M    O U T P U T -------");
    script.main();
  } catch (error) {
    console.error(`Error occurred: ${error}`);
  }
}

run();

