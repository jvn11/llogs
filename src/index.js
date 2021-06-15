const chokidar = require('chokidar')
const { Command, CommanderError } = require('commander')
const chalk = require('chalk')
const appendLogs = require('./fs-log-code')
const program = new Command()

const ignored = "node_modules"

program
  .option('-f, --file <filename>', 'Watches a file')
  .option('-d, --dir <dirname>', 'Watches a directory')
  .option('-g, --genfile <name>', 'Generates a text file with the given name. Default is llogs.')

program.parse(process.argv)

const ops = program.opts()
let watcher = null

const runWatch = (watcher, filename) => {
  const msthen = new Date().getTime()
  // const log = console.log.bind(console)
  const msnow = new Date().getTime()
  watcher
    .on('add', path => appendLogs(`File ${path} has been added (${msnow - msthen} ms | ${new Date().getTime()})`, filename))
    .on('change', path => appendLogs(`File ${path} has been changed (${msnow - msthen} ms | ${new Date().getTime()})`, filename))
    .on('unlink', path => appendLogs(chalk.yellowBright.bold(`File ${path} has been removed (${msnow - msthen} ms | ${new Date().getTime()})`), filename))
    .on('addDir', path => appendLogs(`Directory ${path} has been added (${msnow - msthen} ms | ${new Date().getTime()})`, filename))
    .on('unlinkDir', path => appendLogs(chalk.yellowBright.bold(`Directory ${path} has been removed (${msnow - msthen} ms | ${new Date().getTime()})`), filename))
    .on('error', error => appendLogs(chalk.redBright.bold(`Watcher error: ${error} (${new Date().getTime()})`), filename))
    .on('ready', () => appendLogs(chalk.greenBright.bold(`Ready for changes (${msnow - msthen} ms | ${new Date().getTime()})`), filename))
}

if (ops.file) {
  watcher = chokidar.watch(ops.file, {
    ignored,
    persistent: true
  });

  runWatch(watcher, ops.genfile ? ops.genfile : "llogs")
} else if (ops.dir) {
  watcher = chokidar.watch(ops.dir, {
    ignored,
    persistent: true
  });

  runWatch(watcher, ops.genfile ? ops.genfile : "llogs")
} else {
  throw new CommanderError(1, 'ERR_MISSING_FLAGS', chalk.redBright.bold("Need to specify file or directory using --file or --dir"))
}