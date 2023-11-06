import inquirer from 'inquirer';
import path from 'path';
import { fileURLToPath } from 'url';
import { readdir } from 'fs/promises';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scriptsDir = path.join(__dirname, 'scripts');
const filterFiles = (file) => !file.startsWith('.');

const interpreters = {
  js: 'bun',
  cjs: 'node',
  py: 'python3',
};

async function run() {
  try {
    const days = (await readdir(scriptsDir)).filter(filterFiles);
    const { dayNum } = await inquirer.prompt([
      {
        type: 'list',
        name: 'dayNum',
        message: "Which day's program should run:",
        choices: days,
      },
    ]);

    const filesInDay = await readdir(path.join(scriptsDir, dayNum));
    const mainFile = filesInDay.find(file => file.startsWith('main') && file !== "main")

    if (!mainFile) {
      console.log("No valid 'main' file found in the selected day's directory");
      return;
    }

    const extension = path.extname(mainFile).slice(1);
    const interpreter = interpreters[extension];

    if (!interpreter) {
      console.log("Unsupported file extension");
      return;
    }

    const command = `${interpreter} ${path.join(scriptsDir, dayNum, mainFile)}`;
    console.log(`Executing: ${command}`);

    const output = execSync(command, { encoding: 'utf-8' });
    console.log(output);
  } catch (error) {
    console.error(`Error occurred: ${error}`);
  }
}

run();

