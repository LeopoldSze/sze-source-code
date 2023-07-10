let data = {
  stage: 'GitChat',
  course: {
    title: '前端开发进阶',
    author: ['Lucas', 'Sze'],
    publishTime: '2018年5月'
  }
}

/**
 * 数据拦截
 * @param data
 */
const observe = data => {
  if (!data || Object.prototype.toString.call(data) !== '[object Object]') {
    return
  }
  
  Object.keys(data).forEach(key => {
    let currentValue = data[key];
    
    if (typeof currentValue === 'object') {
      observe(currentValue);
      data[key] = new Proxy(currentValue, {
        set(target, property, value, receiver) {
          // 因为使用数组的push方法会引起length属性的变化，所以调用push之后会触发两次set操作，只需保留一次即可
          if (property !== 'length') {
            console.log(`setting ${key} value now, setting value is:`, currentValue);
          }
          
          return Reflect.set(target, property, value, receiver);
        }
      })
    } else {
      Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get() {
          console.log(`getting ${key} value now, getting value is:`, currentValue);
          return currentValue;
        },
        set(newValue) {
          currentValue = newValue;
          console.log(`setting ${key} value now, setting value is:`, currentValue);
        }
      })
    }
  })
}

observe(data);
data.course.author.push('Messi');

/**
 * virtual DOM
 * @param node
 * @param key
 * @param value
 */
const setAttribute = (node, key, value) => {
  switch (key) {
    case 'style':
      node.style.cssText = value;
      break;
    case 'value':
      let tagName = (node.tagName ?? '').toLowerCase();
      if (tagName === 'input' || tagName === 'textarea') {
        node.value = value;
      } else {
        node.setAttribute(key, value);
      }
      break;
    default:
      node.setAttribute(key, value);
      break;
  }
}

class SzeElement {
  constructor (tagName, attributes = [], children = []) {
    this.tagName = tagName;
    this.attributes = attributes;
    this.children = children;
  }
  
  render() {
    let element = document.createElement(this.tagName);
    let attributes = this.attributes;
    for (const key in attributes) {
      setAttribute(element, key, attributes[key]);
    }
    let children = this.children;
    children.forEach(child => {
      let childElement = child instanceof SzeElement ? child.render() : document.createTextNode(child);
      element.appendChild(childElement);
    })
    return element;
  }
}

function ele(tagName, attributes, children) {
  return new SzeElement(tagName, attributes, children);
}

const renderDom = (element, target) => {
  target.appendChild(element);
}

const chapterListVirtualDom = ele('ul', { id: 'list' }, [
  ele('li', { class: 'chapter' }, ['chapter1']),
  ele('li', { class: 'chapter' }, ['chapter2']),
  ele('li', { class: 'chapter' }, ['chapter3'])
])

const dom = chapterListVirtualDom.render();
renderDom(dom, document.body);

/**
 * diff算法
 * @param oldVirtualDom
 * @param newVirtualDom
 * @returns {{}}
 */
const diff = (oldVirtualDom, newVirtualDom) => {
  let patches = {};
  // 递归树，将比较后的结果存储到patches中
  walkToDiff(oldVirtualDom, newVirtualDom, 0, patches);
  // 返回diff结果
  return patches;
}

let initialIndex = 0;
const walkToDiff = (oldVirtualDom, newVirtualDom, index = initialIndex, patches) => {
  const diffResult = [];
  
  // 如果newVirtualDom不存在，则说明该节点已经被移除，接着可以将type为REMOVE的对象推进diffResult变量，并记录index
  if (!newVirtualDom) {
    diffResult.push({
      type: 'REMOVE',
      index
    })
  } else if (typeof oldVirtualDom === 'string' && typeof newVirtualDom === 'string') { // 如果新旧节点都是文本节点，比较文本中的的内容是否相同，如果不同则记录新的结果
    if (oldVirtualDom !== newVirtualDom) {
      diffResult.push({
        type: 'MODIFY_TEXT',
        data: newVirtualDom,
        index
      })
    }
  } else if (oldVirtualDom.tagName === newVirtualDom.tagName) { // 如果新旧节点类型相同，比较属性是否相同
    const diffAttributeResult = [];
    Object.keys(oldVirtualDom).forEach(key => {
      if (oldVirtualDom[key] !== newVirtualDom[key]) {
        diffAttributeResult[key] = newVirtualDom[key];
      }
    })
    
    Object.keys(newVirtualDom).forEach(key => {
      // 旧节点不存在的新属性
      if (!oldVirtualDom.hasOwnProperty(key)) {
        diffAttributeResult[key] = newVirtualDom[key];
      }
    })
    
    if (Object.keys(diffAttributeResult).length > 0) {
      diffResult.push({
        type: 'MODIFY_ATTRIBUTES',
        diffAttributeResult
      })
    }
    
    // 如果有子节点，则遍历子节点
    oldVirtualDom.children.forEach((child, index) => {
      walkToDiff(child, newVirtualDom?.children[index], ++initialIndex, patches);
    })
  } else { // 如果节点类型不同，已经被直接替换了，则直接将新的结果放入diffResult数组中
    diffResult.push({
      type: 'REPLACE',
      newVirtualDom
    })
  }
  
  // 如果oldVirtualDom不存在，则说明该节点已经被替换，接着可以将type为REPLACE的对象推进diffResult数组中
  if (!oldVirtualDom) {
    diffResult.push({
      type: 'REPLACE',
      newVirtualDom
    })
  }
  
  if (diffResult.length) {
    patches[index] = diffResult;
  }
}

const chapterListVirtualDom2 = ele('ul', { id: 'list2' }, [
  ele('li', { class: 'chapter3' }, ['chapter3']),
  ele('p', { class: 'chapter' }, ['chapter4']),
  ele('li', { class: 'chapter' }, ['chapter4', ele('span', {}, ['啦啦啦'])])
])
const patches = diff(chapterListVirtualDom, chapterListVirtualDom2);
console.log('patches:', patches);


const patch = (node, patches) => {
  let walker = { index: 0 };
  walk(node, walker, patches);
}

const walk = (node, walker, patches) => {
  const currentPatch = patches[walker.index];
  const childNodes = node.childNodes;
  childNodes.forEach(child => {
    walker.index++;
    walk(child, walker, patches);
  })
  
  if (currentPatch) {
    doPatch(node, currentPatch);
  }
}

const doPatch = (node, patches) => {
  patches.forEach(patch => {
    switch (patch.type) {
      case 'MODIFY_ATTRIBUTES':
        const attributes = patch.diffAttributeResult.attributes;
        Object.keys(attributes).forEach(key => {
          if (node.nodeType !== 1) {
            return;
          }
          const value = attributes[key];
          if (value) {
            setAttribute(node, key, value);
          } else {
            node.removeAttribute(key);
          }
        })
        break;
      case 'MODIFY_TEXT':
        node.textContent = patch.data;
        break;
      case 'REPLACE':
        const newNode = (patch.newVirtualDom instanceof SzeElement) ? render(patch.newVirtualDom) : document.createTextNode(patch.newVirtualDom);
        node.parentNode.replaceChild(newNode, node);
        break;
      case 'REMOVE':
        node.parentNode.removeChild(node);
        break;
      default:
        break;
    }
  })
}

patch(dom, patches);