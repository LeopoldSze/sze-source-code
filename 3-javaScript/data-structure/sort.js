/**
 * 数据元素交换
 * @param arr
 * @param index1
 * @param index2
 */
function swap(arr, index1, index2) {
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]]
}

/**
 * 冒泡排序：O(n^2)
 * 多次遍历待排序的数组，比较相邻元素的大小，并根据需要交换它们的位置，
 * 从而将较大的元素逐步“冒泡”到数组的末尾，同时较小的元素逐步沉到数组的前部。通过多轮的冒泡操作，最终得到一个有序的数组。
 * @param arr
 */
function bubbleSort(arr) {
  // 设置比较轮数
  const outLen = arr.length - 1
  for (let i = 0; i < outLen; i++) {
    // 比较元素长度
    const innerLen = outLen - i
    
    for (let j = 0; j < innerLen; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
      }
    }
  }
}
{
  const a = [7, 6, 5, 4, 3, 2, 1]
  bubbleSort(a)
  console.log('bubbleSort:', a)
}

/**
 * 选择排序：O(n^2)
 * 选择排序从待排序的数组中选择最小（或最大）的元素，并将其放置在已排序部分的末尾。
 * 通过多次选择和交换操作，每一轮选择排序可以确定一个当前未排序部分的最小（或最大）元素，将其放置在已排序部分的最后位置上。
 * @param arr
 */
function selectionSort(arr) {
  const len = arr.length
  for (let i = 0; i < len - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    
    if (minIndex !== 1) {
      swap(arr, minIndex, i)
    }
  }
  
  return arr
}
{
  const a = [7, 6, 5, 4, 3, 2, 1]
  selectionSort(a)
  console.log('selectionSort:', a)
}

/**
 * 插入排序：O(n^2)
 * 将待排序的数组分为已排序和未排序两部分。初始时，将第一个元素视为已排序部分，剩余的部分为未排序部分。
 * 然后，逐个将未排序部分的元素插入到已排序部分的正确位置上，直到所有元素都被排序
 * @param arr
 */
function insertSort(arr) {
  const len = arr.length
  for (let i = 1; i < len; i++) {
    let current = arr[i];
    let j = i - 1;
    
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = current;
  }
}
{
  const a = [7, 6, 5, 4, 3, 2, 1]
  insertSort(a)
  console.log('insertSort:', a)
}