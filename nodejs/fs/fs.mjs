import fs from 'fs'

// 读取文件
const content = fs.readFileSync('./1.txt', 'utf-8')
console.log('content1:', content);

fs.readFile('./1.txt', 'utf-8', (err, data) => {
  if (!err) {
    console.log('content2:', data);
  }
})

fs.promises.readFile('./1.txt', 'utf-8').then(data => {
  console.log('content3:', data);
})

const buf = fs.readFileSync('./1.txt');
console.log('content4:', Buffer.isBuffer(buf), buf.toString());


// 写入文件
fs.writeFileSync('./1-new.txt', content, 'utf-8');
const content5 = fs.readFileSync('./1-new.txt', 'utf-8');
console.log('content5:', content5);

const imgBuf = fs.readFileSync('./10.png');
console.log('imgBuf size:', imgBuf.length);
fs.writeFileSync('./10-new.png', imgBuf, 'binary');


// 文件信息
const info = fs.statSync('./1.txt');
console.log('file info:', info);


// 追加输出
fs.appendFileSync('./1.txt', '哈哈哈');
