export const array_remove = (arr, deleteValue) => {
    let index = arr.indexOf(deleteValue);
    if (index > -1) {
        arr.splice(index, 1)
    }
    return arr
}

export const array_unique = (arr) => {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    let array = [];
    for (let i = 0; i < arr.length; i++) {
        if (!array.includes(arr[i])) {//includes 检测数组是否有某个值
            array.push(arr[i]);
        }
    }
    return array
}

