/**
 * 通过reduce实现promise依次执行
 * @param array
 * @param value
 * @returns {*}
 */
const runPromiseInSequence = (array, value) => array.reduce(
  (promiseChain, currentFn) => promiseChain.then(currentFn),
  Promise.resolve(value)
)

const f1 = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('p1 running')
    resolve(1)
  }, 1000)
})

const f2 = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('p2 running')
    resolve(2)
  }, 1000)
})

const array = [f1, f2]
runPromiseInSequence(array, 'init')


/**
 * 通过reduce实现pipe
 * @param fns
 * @returns {function(*): *}
 */
const pipe = (...fns) => input => fns.reduce(
  (acc, fn) => fn(acc),
  input
);

const add = x => x + 1;
const multiply = x => x * 2;
const subtract = x => x - 3;
const compute = pipe(add, multiply, subtract);
console.log(compute(2)); // 3


/**
 * 通过reduce实现koa中的only模块
 * @param obj
 * @param keys
 * @returns {*}
 */
function only(obj = {}, keys = []) {
  return keys.reduce((result, key) => {
    if (obj[key] === null || obj[key] === undefined) {
      return result;
    }
    result[key] = obj[key];
    return result;
  }, {})
}
const onlyObj = {
  a: 1,
  b: 2,
  c: 3
}
const onlyRes = only(onlyObj, ['a', 'b', 'd']);
console.log('onlyRes:', onlyRes);


/**
 * 面向过程的compose实现
 * @param fns
 * @returns {(function(...[*]): (*))|*}
 */
function compose(...fns) {
  const length = fns.length;
  let count = length - 1, result;
  
  return function fl(...args) {
    result = fns[count].apply(this, args);
    
    if (count <= 0) {
      count = length - 1;
      return result;
    }
    count -= 1;
    return fl.call(this, result);
  }
}
const compute2 = compose(add, multiply, subtract);
console.log('compute2:', compute2(4)); // 3


/**
 * 与pipe反向的compose实现
 * @param f
 * @param g
 * @returns {function(...[*]): any}
 */
const reduceFn = (f, g) => (...args) => g.call(this, f.apply(this, args));
const compose2 = (...args) => args.reduceRight(reduceFn, args.pop());
const compute3 = compose2(add, multiply, subtract);
console.log('compute3:', compute3(4)); // 3

/**
 * 依次加载图片
 * @param urlId
 * @returns {Promise}
 */
const loadImg = urlId => {
  const url = `https://img2.woyaogexing.com/2023/05/28/${urlId}.jpg`;
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onerror = () => {
      reject(urlId);
    };
    img.onload = () => {
      setTimeout(() => {
        resolve(urlId);
      }, 2000)
    }
    img.src = url;
    document.body.appendChild(img);
  })
};

const urlIds = ['ca3f6b2708148951062f1a10b567da6f', 'fc32bbba5b36a45b954a9775516a5f6f', 'f6cdf2ef5ae2ee10641937a2d47671d7', 'e52de5bf9a4fb8531dbf2eef50f0e9a0', '1dd1291e6a23211ce8096d063f405fba'];
urlIds.reduce((prevPromise, urlId) => {
  return prevPromise.then(() => loadImg(urlId));
}, Promise.resolve());

/**
 * 控制并发加载
 * @param urlIds
 * @param loadImg
 * @param limit
 * @returns {Promise|*}
 */
const loadByLimit = (urlIds, loadImg, limit) => {
  const urlIdsCopy = [...urlIds];
  
  // 如果数组长度小于最大并发数，则直接发出全部请求
  if (urlIdsCopy.length <= limit) {
    const promiseArray = urlIds.map(id => loadImg(id));
    return Promise.all(promiseArray);
  }
  
  const promiseArray = urlIdsCopy.splice(0, limit).map(id => loadImg(id));
  urlIdsCopy.reduce((prevPromise, urlId) => {
    prevPromise
      .then(() => Promise.race(promiseArray))
      .catch(error => console.log(error))
      .then(id => {
        let pos = promiseArray.findIndex(promiseId => id === promiseId);
        promiseArray.splice(pos, 1);
        promiseArray.push(loadImg(urlId));
      })
  }, Promise.resolve())
}
loadByLimit(urlIds, loadImg, 3);