const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec;
const ejs = require('ejs')
const question = require('./question')
const PACKAGEJSON = './package.json'

const getEjsTemplate = (path) => {
  return fs.readFileSync(`./template/${path}`).toString()
}

inquirer.prompt(question).then(result => {
  fs.mkdir(result.projectName, '0777', () => {
    const packageJson = getEjsTemplate('package.ejs')
    const json = ejs.render(packageJson, {
      packageName: result.projectName,
      frame: result.frame
    })
    fs.writeFile(path.join(__dirname, result.projectName, PACKAGEJSON), json, () => {
      const html = ejs.render(getEjsTemplate('html.ejs'))
      result.isHtml && fs.writeFile(path.join(__dirname, result.projectName, './index.html'), html, () => {
      
      })
      exec(`${result.package} install`, { cwd: result.projectName })
    })
  })
})