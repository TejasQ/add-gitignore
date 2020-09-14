#!/usr/bin/env node
import meow from "meow";
import request from "request";
import ora from "ora";
import fuzzy from "fuzzy";
import { registerPrompt, prompt } from "inquirer";

const cli = meow(`This really simple script quickly fetches a .gitignore
file from gitignore.io based on your needs and adds it
to your project.

Usage
    $ add-gitignore <env1> <env2> <env3>
    $ add-gitignore # brings up a helpful multiselect prompt
    
Examples
    $ add-gitignore macOS Emacs node`);

const writeGitIgnore = (envs: string[]) => {
  const { resolve } = require("path");
  const { createWriteStream } = require("fs");
  const { green } = require("chalk");

  const spinner = ora("Adding .gitignore...");

  request(`https://www.gitignore.io/api/${envs.join(",")}`).pipe(
    createWriteStream(resolve(process.cwd(), ".gitignore"))
      .on("open", () => spinner.start())
      .on("close", () => {
        spinner.stopAndPersist({
          symbol: "✅ ",
          text: `Added .gitignore for ${green.bold(envs.join(", "))}.`,
        });
      }),
  );
};

/**
 * If called without inputs,
 * get a list of available inputs and prompt the
 * user to choose some stuff.
 */
if (!cli.input.length) {
  const spinner = ora("Fetching environments...").start();

  registerPrompt("checkbox-plus", require("inquirer-checkbox-plus-prompt"));

  request("https://www.gitignore.io/api/list", {}, (error, _, body: string) => {
    if (error) {
      console.log("Error", error);
      process.exit(1);
    }

    // The response has new lines in it. 🤔
    const results = body
      .replace(/\n/g, ",")
      .split(",")
      .filter((item) => item.length > 0);
    spinner.stop();

    prompt([
      {
        type: "checkbox-plus",
        name: "input",
        message: "What environments do you want your .gitignore to ignore?",
        choices: results.map((name) => ({ name })),
        pageSize: 10,
        highlight: true,
        searchable: true,
        source: (_: unknown, input = "") =>
          Promise.resolve(fuzzy.filter(input, results).map(({ original }) => original)),
        validate: function (answer: string) {
          if (answer.length < 1) {
            return "You must choose at least one environment to ignore.";
          }
          return true;
        },
      },
    ]).then(({ input }) => {
      writeGitIgnore(input);
    });
  });
} else {
  writeGitIgnore(cli.input);
}
