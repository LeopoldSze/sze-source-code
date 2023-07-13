/**
 * 冒泡排序：O(n^2)，其中 n 是元素数量
 * 1. 从数组的第一个元素开始，向后依次比较相邻的两个元素。
 * 2. 如果当前元素大于后一个元素，则交换它们的位置，使得较大的元素向后移动。
 * 3. 经过一轮比较后，最大的元素会移动到数组的末尾。
 * 4. 重复步骤 1-3，但每次比较的元素个数减少，因为最大的元素已经在最后。
 * 5. 重复以上步骤，直到所有元素都排序完成。
 * @param arr
 */
function bubbleSort(arr) {
  // 外层循环控制比较的轮数
  for (let i = 0; i < arr.length - 1; i++) {
    // 内层循环进行相邻元素的比较和交换
    for (let j = 0; j < arr.length - 1 - i; j++) {
      // 如果相邻元素逆序，则交换它们的位置
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  
  return arr;
}
{
  const a = [7, 6, 5, 4, 3, 2, 1]
  bubbleSort(a)
  console.log('bubbleSort:', a)
}



/**
 * 双向冒泡排序（鸡尾酒排序）：平均时间复杂度仍然是O(n^2)
 * 1. 首先设定一个左侧边界和一个右侧边界，初始时左侧边界为数组的首部，右侧边界为数组的尾部。
 * 2. 每一轮排序都进行两道步骤：从左往右冒泡和从右往左冒泡。
 * 3. 从左往右冒泡的过程与标准的冒泡排序相同，比较相邻的两个元素，如果逆序则交换位置，将较大的元素冒泡到右侧。
 * 4. 右侧边界左移一个位置。
 * 5. 如果本轮从左往右冒泡没有发生元素交换，说明数组已经有序，可以提前结束排序。
 * 6. 从右往左冒泡的过程与标准的冒泡排序相同，比较相邻的两个元素，如果逆序则交换位置，将较小的元素冒泡到左侧。
 * 7. 左侧边界右移一个位置。
 * 8. 如果本轮从右往左冒泡没有发生元素交换，说明数组已经有序，可以提前结束排序。
 * 9. 重复步骤 3-8，直到左侧边界等于右侧边界。
 */
function cocktailSort(arr) {
  let left = 0; // 左侧边界
  let right = arr.length - 1; // 右侧边界
  
  while (left < right) {
    let swapped = false; // 标记本轮是否有元素交换
    
    // 从左往右进行冒泡
    for (let i = left; i < right; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    right--; // 右侧边界左移
    
    // 如果本轮未发生交换，说明数组已经有序，提前结束排序
    if (!swapped) {
      break;
    }
    
    // 从右往左进行冒泡
    for (let i = right; i > left; i--) {
      if (arr[i] < arr[i - 1]) {
        [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
        swapped = true;
      }
    }
    left++; // 左侧边界右移
    
    // 如果本轮未发生交换，说明数组已经有序，提前结束排序
    if (!swapped) {
      break;
    }
  }
  
  return arr;
}



/**
 * 选择排序：O(n^2)，其中 n 是元素数量
 * 1. 从数组中选择最小的元素，并将其与数组的第一个元素进行交换。
 * 2. 在剩余的元素中选择最小的元素，并将其与数组的第二个元素进行交换。
 * 3. 重复以上步骤，每次选择剩余元素的最小值，并与对应位置的元素进行交换，直到整个数组排序完成。
 */
function selectionSort(arr) {
  // 外层循环控制选择的轮数
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i; // 最小元素的索引
    
    // 内层循环寻找最小元素的索引
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    // 将最小元素与当前位置交换
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  
  return arr;
}
{
  const a = [7, 6, 5, 4, 3, 2, 1]
  selectionSort(a)
  console.log('selectionSort:', a)
}



/**
 * 插入排序：O(n^2)，其中 n 是元素数量
 * 1. 将数组分成已排序部分和未排序部分，一开始已排序部分只包含第一个元素，未排序部分包含剩余的元素。
 * 2. 遍历未排序部分的元素，将每个元素插入到已排序部分的正确位置上。
 * 3. 在已排序部分，从后往前比较元素，如果当前元素比待插入的元素大，则将当前元素向后移动一个位置。
 * 4. 重复步骤3，直到找到待插入元素的正确位置或者已经比较到已排序部分的开头。
 * 5. 插入待插入元素到正确位置。
 * 6. 重复步骤2-5，直到整个数组排序完成。
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



/**
 * 归并排序：O(nlogn)
 * 1. 首先将数组分成两个较小的子数组，直到每个子数组只有一个元素（即基本有序）。
 * 2. 然后，逐层合并子数组，创建一个新的有序数组，直到合并成一个完整的有序数组为止。
 * 3. 在合并的过程中，比较两个子数组的元素，将较小的元素添加到新数组中，并移动指针以指向下一个元素。
 * 4. 如果一个子数组中的所有元素都被添加到新数组中，而另一个子数组还有剩余元素，则将剩余元素直接添加到新数组中。
 * 5. 最后返回合并后的有序数组。
 */
function mergeSort(arr) {
  // base case: 如果数组长度小于等于1，说明已经有序，直接返回
  if (arr.length <= 1) {
    return arr;
  }
  
  // 将数组分为两半
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  
  // 递归地对左右两部分进行归并排序
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);
  
  // 合并两个有序数组
  return merge(sortedLeft, sortedRight);
}

/**
 * 辅助函数：合并两个有序数组
 * @param left
 * @param right
 * @returns {*[]}
 */
function merge(left, right) {
  let i = 0; // left 数组的指针
  let j = 0; // right 数组的指针
  const merged = []; // 存储合并后的有序数组
  
  // 比较 left 和 right 数组中的元素，将较小的元素添加到 merged 数组中
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      merged.push(left[i]);
      i++;
    } else {
      merged.push(right[j]);
      j++;
    }
  }
  
  // 将剩余的元素添加到 merged 数组中
  while (i < left.length) {
    merged.push(left[i]);
    i++;
  }
  
  while (j < right.length) {
    merged.push(right[j]);
    j++;
  }
  
  return merged;
}



/**
 * 快速排序：平均情况下的时间复杂度为 O(nlogn)，最坏情况下的时间复杂度达到 O(n^2)
 * 1. 首先选择一个基准元素（pivot），可以是随机选择或者固定选择第一个或最后一个元素。
 * 2. 将数组分成两个部分，一部分是所有比基准元素小的元素，另一部分是所有比基准元素大的元素。相等的元素可以放在任意一侧。
 * 3. 递归地对两个部分进行快速排序，直到每个部分只剩下一个元素或为空。
 * 4. 合并两个部分得到最终的有序数组，合并顺序为 左子数组 + 基准元素 + 右子数组。
 */
function quickSort(arr) {
  // base case: 如果数组长度小于等于1，说明已经有序，直接返回
  if (arr.length <= 1) {
    return arr;
  }
  
  // 选择一个基准元素，可以是随机选择或者固定选择第一个或最后一个元素
  const pivot = arr[0];
  
  // 分区过程
  const less = []; // 存储比基准元素小的元素
  const equal = []; // 存储与基准元素相等的元素
  const greater = []; // 存储比基准元素大的元素
  
  arr.forEach((num) => {
    if (num < pivot) {
      less.push(num);
    } else if (num === pivot) {
      equal.push(num);
    } else {
      greater.push(num);
    }
  });
  
  // 递归地对分区后的子数组进行快速排序
  const sortedLess = quickSort(less);
  const sortedGreater = quickSort(greater);
  
  // 合并子数组得到最终的有序数组
  return [...sortedLess, ...equal, ...sortedGreater];
}



/**
 * 计数排序：O(n+k)，其中 n 是元素数量，k 是元素的范围大小
 * 1. 首先找到数组中的最大值和最小值，确定计数数组的范围。
 * 2. 创建一个计数数组，长度等于最大值与最小值差值加一。将该数组初始化为0。
 * 3. 统计原始数组中每个元素出现的次数，将次数记录在计数数组中，数组索引对应元素值减去最小值。
 * 4. 根据计数数组的结果，按照元素值的顺序重建原始数组。将元素值依次填充到原始数组中，填充次数等于计数数组中对应元素的值。
 * 5. 返回排序后的原始数组。
 */
function countingSort(arr) {
  // 找到数组中的最大值和最小值
  let minValue = arr[0];
  let maxValue = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < minValue) {
      minValue = arr[i];
    } else if (arr[i] > maxValue) {
      maxValue = arr[i];
    }
  }
  
  // 创建计数数组，并初始化为0
  const countArray = new Array(maxValue - minValue + 1).fill(0);
  
  // 统计每个元素的出现次数
  arr.forEach((num) => {
    countArray[num - minValue]++;
  });
  
  // 根据计数数组的结果，重建原始数组
  let sortedIndex = 0;
  countArray.forEach((count, i) => {
    while (count > 0) {
      arr[sortedIndex] = i + minValue;
      sortedIndex++;
      count--;
    }
  });
  
  return arr;
}



/**
 * 桶排序： O(n+k)，其中 n 是元素数量，k 是桶的数量
 * 1. 首先确定桶的数量，这取决于数组中的最大值和最小值以及桶的大小。
 * 2. 将数组中的元素分配到对应的桶中。可以根据元素的数值范围和桶的数量确定元素属于哪个桶。
 * 3. 对每个桶独立地进行排序，可以使用插入排序、快速排序等排序算法。
 * 4. 最后将每个桶中的元素按顺序合并起来，形成一个有序的数组。
 */
function bucketSort(arr, bucketSize = 5) {
  // 找到数组中的最大值和最小值
  let minValue = arr[0];
  let maxValue = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < minValue) {
      minValue = arr[i];
    } else if (arr[i] > maxValue) {
      maxValue = arr[i];
    }
  }
  
  // 计算桶的数量
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  const buckets = Array.from({ length: bucketCount }, () => []);
  
  // 将元素分配到对应的桶中
  arr.forEach((num) => {
    const bucketIndex = Math.floor((num - minValue) / bucketSize);
    buckets[bucketIndex].push(num);
  });
  
  // 对每个桶独立进行排序
  const sortedArray = [];
  buckets.forEach((bucket) => {
    insertionSort(bucket); // 这里可以使用其他的排序算法
    sortedArray.push(...bucket);
  });
  
  return sortedArray;
}

/**
 * 辅助函数：插入排序
 * @param arr
 */
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
}



/**
 * 基数排序：O(nk)，其中 n 是元素数量，k 是最大元素的位数
 * 1. 首先找到数组中的最大值，并确定最大值的位数。
 * 2. 从最低位（个位）开始至最高位，依次对每个位数进行排序。
 * 3. 对每个位数，创建 10 个桶（0-9）。
 * 4. 遍历数组，将每个元素根据当前位数的值放入对应的桶中。
 * 5. 合并所有桶中的元素，形成一个新的数组。
 * 6. 重复第 4 步和第 5 步，直到对所有位数都完成排序。
 * 7. 返回排序后的数组。
 */
function radixSort(arr) {
  // 找到数组中的最大值
  const maxValue = Math.max(...arr);
  
  // 计算最大值的位数
  const maxDigitCount = countDigits(maxValue);
  
  // 对每个位数进行排序
  for (let digit = 0; digit < maxDigitCount; digit++) {
    // 创建 10 个桶（0-9）
    const buckets = Array.from({ length: 10 }, () => []);
    
    // 将元素分配到对应的桶中
    arr.forEach((num) => {
      const digitValue = getDigit(num, digit);
      buckets[digitValue].push(num);
    });
    
    // 合并所有桶中的元素，形成新的数组
    arr = [].concat(...buckets);
  }
  
  return arr;
}

/**
 * 辅助函数：获取数字的指定位数
 * @param num
 * @param digit
 * @returns {number}
 */
function getDigit(num, digit) {
  return Math.floor(Math.abs(num) / Math.pow(10, digit)) % 10;
}

/**
 * 辅助函数：计算数字的位数
 * @param num
 * @returns {number}
 */
function countDigits(num) {
  if (num === 0) {
    return 1;
  }
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}