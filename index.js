#!/usr/bin/env node
const meow = require("meow");

const help = `This really simple script quickly fetches a .gitignore
file from gitignore.io based on your needs and adds it
to your project.

Usage
    $ add-gitignore <env1> <env2> <env3>
    
Examples
    $ add-gitignore macOS Emacs node`;

const cli = meow(help);

// Show the docs and exit if used without inputs.
if (!cli.input.length) {
  console.log(help);
  process.exit(0);
}

// If the process doesn't exist earlier, require and do more stuff.
const { resolve } = require("path");
const { realPath, createWriteStream } = require("fs");
const request = require("request");
const ora = require("ora");

const spinner = ora("Adding .gitignore...");

request(`https://www.gitignore.io/api/${cli.input.join(",")}`).pipe(
  createWriteStream(resolve(process.cwd(), ".gitignore"))
    .on("open", () => spinner.start())
    .on("close", () => {
      spinner.stopAndPersist({
        symbol: "✅ ",
        text: "Added .gitignore."
      });
    })
);
