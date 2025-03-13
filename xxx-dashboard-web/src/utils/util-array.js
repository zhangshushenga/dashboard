/**
 * 判断两个数据元素是都完全一致
 * @param {*} arr1 
 * @param {*} arr2 
 * @returns 
 */
export function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();

    for (let i = 0; i < sortedArr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) {
            return false;
        }
    }

    return true;
}

/**
 * 将数组每个元素拼成一个字符串
 * @param {*} arr 
 * @returns 
 */
export function concatenateArrayElements(arr) {
    if (!Array.isArray(arr)) {
        throw new Error("Input should be an array.");
    }

    return arr.join(',');
}