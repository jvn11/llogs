# LLOGS

> A logger that logs the information of your files, and puts all of the info in a generated text file.

[![Coverage Status](https://coveralls.io/repos/github/jvn11/llogs/badge.svg?branch=main)](https://coveralls.io/github/jvn11/llogs?branch=main)
[![Build Status](https://travis-ci.com/jvn11/llogs.svg?branch=main)](https://travis-ci.com/jvn11/llogs)
[![NPM Version](https://img.shields.io/npm/v/llogs.svg)](https://npmjs.com/package/llogs)

## Install

`npm install --save llogs`

## Use

`package.json`:

```json
// ...

"scripts": {
  "llog": "llog -f path/to/your/file.js"
}

// ...
```

## Flags

**NOTE** that llogs can log info about directories and files, and we have different flags for that:

### `-f, --file <filename>`: Watches a file

Example:

```shell
$ llogs -f path/to/file.txt
```

### `-d, --dir <dirname>`: Watches a directory

Example:

```shell
$ llogs -d path/to/dir
```

### `-g, --genfile <name>`: Generates a text file with the given name. Default is llogs.

Example:

```shell
$ llogs -f for/this/example.gen.d.ts -g for-this-example-checker
```

Generates a file called `for-this-example-checker.txt`

## License

Under the MIT License