// 普通导出
export const name = 'foo';

export function foo() {
  console.log('foo');
}


// 默认导出，每个文件只能有一个
export default {
  desc: '哈哈哈',
  obj: {
    age: 18,
    log() {
      console.log(this.age);
    }
  }
}
