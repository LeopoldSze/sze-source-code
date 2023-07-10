import imgSrc from './assets/photo.png'
import svgLogo from './assets/1.svg'
import txt from './assets/hello.txt'
import jpgSrc from './assets/1.jpg'
import './style.less'
import style from './test.css'
import Data from './assets/data.xml'
import Notes from './assets/data.csv'
import toml from './assets/data.toml'
import yaml from './assets/data.yaml'
import json5 from './assets/data.json5'
import helloWorld from './hello'
import _ from 'lodash'
import './async-module'

(function () {
  return 'Leopold-Sze'
})()

const result = (function () {
  return '私有变量1'
})()

console.log('result:', result)
console.log('style:', style)

function hello () {
  console.log('hello!!!')
}

hello()

const img = document.createElement('img')
const img2 = document.createElement('img')
const img3 = document.createElement('img')
img.style.width = '200px'
img2.style.width = '200px'
img3.style.width = '400px'
img.src = imgSrc
img2.src = svgLogo
img3.src = jpgSrc
document.body.appendChild(img)
document.body.appendChild(img2)
document.body.appendChild(img3)

const block = document.createElement('div')
block.style.cssText = 'width: 200px; height: 200px; background-color: aqua;'
block.textContent = txt
document.body.appendChild(block)

// 测试less
document.body.classList.add('hello')
// 测试css
block.classList.add('test')
// 测试image图像
block.classList.add('block-bg')
// 测试字体
const span = document.createElement('span')
span.classList.add('icon')
span.innerHTML = '执子之手，将子拖走!子若不走，拍晕了继续拖走!'
document.body.appendChild(span)

// 测试XML和CSV
console.log('data:', Data)
console.log('csv:', Notes)

// 测试toml yaml json5
console.log('toml:', toml.title)
console.log('toml:', toml.owner.name)
console.log('yaml:', yaml.title)
console.log('yaml:', yaml.owner.name)
console.log('json5:', json5.title)
console.log('json5:', json5.owner.name)

// 测试babel
helloWorld()

// 测试代码分割
const str = _.join(['main', 'module', 'loaded!'], '-')
console.log(str)

// 测试按需加载
const button = document.createElement('button')
button.innerHTML = '点我测试按需加载'
document.body.appendChild(button)
button.addEventListener('click', () => {
  import(/* webpackChunkName: 'math', webpackPrefetch: true */'./math').then(({ add }) => {
    console.log(add(4, 5))
  })
})

fetch('/api/hello')
  .then(res => res.text())
  .then(result => {
    console.log('result:', result)
  })

// 测试postcss & css module
const div = document.createElement('div')
div.innerHTML = 'css 模块化'
div.classList.add(style.box)
document.body.appendChild(div)

// 测试web worker
const worker = new Worker(new URL('./work.js', import.meta.url))
worker.postMessage({
  question: 'hi, 那边的worker线程，请告诉我今天的幸运数字是多少？'
})
worker.onmessage = message => {
  console.log('message:', message.data.answer)
}
