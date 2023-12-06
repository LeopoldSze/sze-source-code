import foo, { name, foo as newFoo } from './foo' // 默认导入、解构导入、解构重命名导入
import * as all from './foo' // 全量重命名导入

newFoo();
console.log('bar:', foo.desc, name);

foo.obj.age++;
foo.obj.log();
console.log('foo:', all);
