const { spawn } = require("child_process");

const linkProjectCommand = "npx vercel link";

const executeLinkCommand = () => {
  const childProcess = spawn(linkProjectCommand, {
    stdio: "inherit",
    shell: true,
  });

  childProcess.on("close", (code) => {
    if (code === 0) {
      console.log("Command executed successfully.");
    } else {
      console.error(`Command failed with code ${code}.`);
    }
  });
};

executeLinkCommand();
