const { spawn, exec } = require("child_process");
const inquirer = require("inquirer");
const dotenv = require("dotenv");
const fs = require("fs");
require("dotenv").config();

const linkProjectCommand = "npx vercel link";
const localBuildCommand = 'yarn build'

const deployToVercel = (command) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return;
    }
    console.log("Deploying to vercel...");
    process.exit(0);
  });
};

const promptUserForEnvironment = async () => {
  const { environment } = await inquirer.prompt([
    {
      type: "list",
      name: "environment",
      message: "Select environment:",
      choices: ["production", "preview", "development"],
    },
  ]);
  return environment;
};

const runEnvPullCommand = async (environment) => {
  const envPullCommand = `npx vercel env pull .env --environment=${environment}`;

  const childProcess = spawn(envPullCommand, {
    stdio: "inherit",
    shell: true,
  });

  childProcess.on("close", (code) => {
    if (code === 0) {
      console.log("Command executed successfully.");

      // Reload .env file to update process.env
      const envConfig = dotenv.parse(fs.readFileSync(".env"));
      for (const key in envConfig) {
        process.env[key] = envConfig[key];
      }

      console.log(
        "CURRENT DELIVERY API KEY ---------->",
        process.env.DELIVERY_API_KEY
      );
      const buildCommand = `npx vercel --build-env PREVIEW_API_KEY=${process.env.PREVIEW_API_KEY} --build-env PROJECT_ID=${process.env.PROJECT_ID} --build-env DELIVERY_API_KEY=${process.env.DELIVERY_API_KEY}`;

      deployToVercel(buildCommand);
    } else {
      console.error(`Command failed with code ${code}.`);
    }
  });
};


const executeLinkCommand = async () => {
  const childProcess = spawn(linkProjectCommand, {
    stdio: "inherit",
    shell: true,
  });

  childProcess.on("close", async (code) => {
    if (code === 0) {
      console.log("Command executed successfully.");
      const environment = await promptUserForEnvironment();
      runEnvPullCommand(environment);
    } else {
      console.error(`Command failed with code ${code}.`);
    }
  });
};

const runLocalBuild = () => {
  const childProcess = spawn(localBuildCommand, {
    stdio: "inherit",
    shell: true,
  });

  childProcess.on("close", (code) => {
    if (code === 0) {
      console.log("Build Command executed successfully.");
      executeLinkCommand();
    } else {
      console.error(`Command failed with code ${code}.`);
    }
  });
};

runLocalBuild();
