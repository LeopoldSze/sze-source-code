function unique_es6 (arr) {
  return [...new Set(arr)];
}

function unique_es5 (arr) {
  return arr.filter((item, index, array) => {
    return array.indexOf(item) === index;
  });
}

