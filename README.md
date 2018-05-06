# add-gitignore

This tiny CLI script that generates a `.gitignore` file for your projects.

![add-gitignore demo](https://raw.githubusercontent.com/TejasQ/add-gitignore/master/demo.gif)

## Usage

You'll want to make sure you have [NodeJS](https://nodejs.org/en/) installed on your computer. Then, setup is as simple as:

* `npx add-gitignore`

If you've got an older version of node that doesn't yet have [`npx`](https://www.npmjs.com/package/npx), here's a more traditional setup:

* `npm i -g add-gitignore`
* `add-gitignore macOS Emacs node # or whatever you need`

Alternatively, running just `add-gitignore` gives you a nice multi-select interface from which you can choose what to ignore, and using the `--help` flag helps you out.

## Special Thanks

* [Joe Blau](https://github.com/joeblau) for [gitignore.io](https://gitignore.io).
* [Fabien Bernard](https://www.github.com/fabien0102) for the suggestion of a tool like this.
* [Sindre Sorhus](https://www.github.com/sindresorhus) for the open source tools that this uses ([ora](https://github.com/sindresorhus/ora), [meow](https://github.com/sindresorhus/meow)).

I hope this makes your life easier.

Made with ❤️.
