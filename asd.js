const { exec } = require("child_process");
require("dotenv").config();

const buildCommand = `npx vercel --build-env PREVIEW_API_KEY=${process.env.PREVIEW_API_KEY} --build-env PROJECT_ID=${process.env.PROJECT_ID} --build-env DELIVERY_API_KEY=${process.env.DELIVERY_API_KEY}`;

const linkProjectCommand = `npx vercel link`;

const envPullCommand = `npx vercel env pull `;

const runCommand = (command) => {
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

const deployToVercel = () => {
  runCommand(buildCommand);
};

const cancelDeployment = () => {
  console.log("Deployment canceled.");
  process.exit(0);
};

const getUserAnswer = (data) => data.toString().trim().toLowerCase();

const evaluateAnswer = () =>
  process.stdin.once("data", (data) => {
    const answer = getUserAnswer(data);

    if (answer === "yes" || answer === "y") {
      return deployToVercel();
    }
    cancelDeployment();
  });

const askQuestion = (question) => process.stdout.write(question);

const promptUserForConfirmation = () => {
  askQuestion("Are you sure you want to deploy? (yes/no): ");
  evaluateAnswer();
};

promptUserForConfirmation();
