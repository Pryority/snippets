import inquirer from 'inquirer';
import path from 'path';
import { fileURLToPath } from 'url';
import { readdir, readFile } from 'fs/promises';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scriptsDir = path.join(__dirname, 'scripts');
const filterFiles = (file) => !file.startsWith('.');

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

    const scriptPath = path.join(scriptsDir, dayNum, 'main');
    const extension = path.extname(scriptPath).slice(1);
    console.log("scriptPath", scriptPath)
    console.log("Extension", extension)

    let command;

    switch(extension) {
      case 'js':
        command = `node ${scriptPath}.${extension}`
        break;
      case 'py':
        command = `python3 ${scriptPath}.${extension}`
        break;
      default:
        console.log("Unsupported file extension");
        return;
    }

    console.log(`Code from Day ${dayNum.substring(3)}:\n`, scriptContent); // Use backticks for string interpolation

    exec(command, (error, stdout, stderr) => {
      console.log("___________________________________________");
      console.log("------ P R O G R A M    O U T P U T -------");
      if (error) {
        console.error(`Error occurred: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Error occurred: ${stderr}`)
        return;
      }
      console.log(stdout)
    });
  } catch (error) {
    console.error(`Error occurred: ${error}`)
  }
}

run();

