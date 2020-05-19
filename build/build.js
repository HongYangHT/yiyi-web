/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 用于标示打包构建成功
 * @Date: 2020-04-01 18:27:22
 * @LastEditTime: 2020-04-09 22:54:06
 */

const chalk = require('chalk')
const ora = require('ora')

const spinner = ora('building for production...')

spinner.stop()
console.log('\n')
console.log(chalk.cyan('  Build complete.\n'))
console.log(chalk.yellow(
  '  Tip: built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
))
