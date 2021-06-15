const fs = require('fs')
const appRoot = require('app-root-path')
global.appRoot = appRoot.path

const appendLogs = (text, filename) => {
  fs.appendFileSync(`${global.appRoot}/${filename}.txt`, `${text}\n`, { encoding: 'utf-8' })
  console.log(text)
}

module.exports = appendLogs