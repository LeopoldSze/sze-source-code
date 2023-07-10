let o = { 2: 2, 1: 1 }
Object.keys(o) // ['1', '2']  键只能是无序的字符串
let map = new Map()
map.set(o, 1)
map.set(2, 2)
for (let key of map) {
  console.log(key) // [{…}, 1] [2, 2]  键可以是任意类型，且根据添加的顺序遍历
}
