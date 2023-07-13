/**
 * 二分查找
 * 二分查找是在已排序的数组中查找特定元素的算法。它首先确定待查找范围的左右边界，每次取中间位置的元素与目标值进行比较。
 * 如果中间元素等于目标值，则返回其索引。如果中间元素小于目标值，
 * 则将左边界向右缩小到中间位置的右侧；如果中间元素大于目标值，则将右边界向左缩小到中间位置的左侧。
 * 通过每次将查找范围缩小一半，不断迭代比较，最终可以找到目标值或确定其不存在。
 * @param arr
 * @param target
 * @returns {number}
 */
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    }
    
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}
{
  const a = [1, 2, 3, 5, 89, 103]
  console.log('binarySearch:', binarySearch(a, 89)) // 4
}

{
  const obj = {
    name: 'sze',
    other: {
      age: 14
    }
  }
  const a = 123
  const func = (obj, x) => {
    obj.other = 333
    x = 20
    console.log('func:', obj, x)
  }
  func(obj, a)
  console.log('dta:', obj, a)
}