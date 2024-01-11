let db = null;
let db_table = null;
const dbName = 'indexDB';
const version = 1;
const data = [
  {
    id: 1,
    name: '张一',
    age: 1,
    email: 'zhangsan@example.com'
  },
  {
    id: 2,
    name: '张二',
    age: 2,
    email: 'zhangsan@example.com'
  },
  {
    id: 3,
    name: '张三',
    age: 3,
    email: 'zhangsan@example.com'
  },
  {
    id: 4,
    name: '张四',
    age: 4,
    email: 'zhangsan@example.com'
  },
  {
    id: 5,
    name: '张五',
    age: 5,
    email: 'zhangsan@example.com'
  }
];

const createBtn = document.querySelector('#db-create');
const addBtn = document.querySelector('#db-add');
const readBtn = document.querySelector('#db-read');
const updateBtn = document.querySelector('#db-update');
const deleteBtn = document.querySelector('#db-delete');
const indexBtn = document.querySelector('#db-index');
const traverseBtn = document.querySelector('#db-traverse');

createBtn.addEventListener('click', create);
addBtn.addEventListener('click', add);
readBtn.addEventListener('click', read);
updateBtn.addEventListener('click', update);
deleteBtn.addEventListener('click', remove);
indexBtn.addEventListener('click', getByIndex);
traverseBtn.addEventListener('click', traverse);

/**
 * 新建数据库和表
 */
function create() {
  const request = window.indexedDB.open(dbName, version);
  
  /**
   * 数据库打开失败
   */
  request.onerror = function(error) {
    console.log('indexedDB 打开失败：', error);
  }
  
  /**
   * 数据库打开成功
   */
  request.onsuccess = function(res) {
    console.log('indexedDB 打开成功：', res);
    db = res.target.result;
    showToast('数据库打开成功！');
  }
  
  /*
   * 数据库升级(第一次新建库是也会触发，因为从无到有算是升级了一次)
   */
  request.onupgradeneeded = function (res){
    console.log('IndexedDB 升级成功:', res);
    db = res.target.result;
    // 创建表group，配置项 keyPath：主键，也可以 autoIncrement: true 自动生成
    db_table = db.createObjectStore('group', { keyPath: 'id' });
    // 创建索引indexName，配置对象（说明该属性是否包含重复的值）
    db_table.createIndex('indexName', 'name', { unique: false });
  }
}

/**
 * 添加数据
 */
function add() {
  if (!db) {
    showToast('请先创建或打开数据库');
    return false;
  }
  /**
   * 新建写入模式事务
   */
  const store = db.transaction(['group'], 'readwrite').objectStore('group');
  data.forEach(item => {
    const addReq = store.add(item);
    
    addReq.onsuccess = function(event) {
      console.log('数据添加成功：', event);
    }
    
    addReq.onerror = function(error) {
      console.log('数据添加失败：', error);
    }
  })
}

/**
 * 读取数据
 */
function read() {
  if (!db) {
    showToast('请先创建或打开数据库');
    return false;
  }
  const store = db.transaction(['group']).objectStore('group');
  const readReq = store.get(1);
  
  readReq.onsuccess = function (event) {
    if(event.target.result){
      console.log('数据获取成功:', event.target.result);
    } else{
      console.log('未获取到数据:', event);
    }
  };
  
  readReq.onerror = function (error) {
    console.log('数据获取失败:', error);
  };
}

/**
 * 更新数据
 * @returns {boolean}
 */
function update() {
  if (!db) {
    showToast('请先创建或打开数据库');
    return false;
  }
  
  const store = db.transaction(['group'], 'readwrite').objectStore('group');
  const updateReq = store.put({
    id: 1,
    name: '王二麻子',
    age: 24,
    email:'zhangsan@example.com'
  });
  
  updateReq.onsuccess = function (event) {
    console.log('数据更新成功:', event);
  };
  
  updateReq.onerror = function (event) {
    console.log('数据更新失败:', event);
  };
}

/**
 * 删除数据
 * @returns {boolean}
 */
function remove() {
  if (!db) {
    showToast('请先创建或打开数据库');
    return false;
  }
  
  const store = db.transaction(['group'], 'readwrite').objectStore('group');
  const removeReq = store.delete(1);

  removeReq.onsuccess = function (event) {
    console.log('数据删除成功:', event);
  };
  
  removeReq.onerror = function (event) {
    console.log('数据删除失败:', event);
  };
}

/**
 * 通过索引获取数据
 */
function getByIndex() {
  const store = db.transaction(['group']).objectStore('group');
  const indexReq = store.index('indexName').get('张五');
  
  indexReq.onsuccess = function (event) {
    console.log('通过索引获取数据成功：', event.target.result);
  }
  
  indexReq.onerror = function (event) {
    console.log('通过索引获取数据失败：', event);
  }
}

/**
 * 遍历数据
 */
function traverse() {
  const store = db.transaction(['group']).objectStore('group');
  // 获取指针对象
  const cursorReq = store.openCursor();
  
  cursorReq.onsuccess = function (event) {
    const cursor = event.target.result;
    if(cursor) {
      console.log('数据遍历成功：', cursor.value);
      cursor.continue();
    } else {
      console.log('没有更多数据了');
    }
  }
  
  cursorReq.onerror = function (event) {
    console.log('数据遍历失败:', event);
  }
}

