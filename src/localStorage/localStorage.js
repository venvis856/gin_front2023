import localStorage from "localStorage";
//设置缓存
export const localStorageSet = (name, data, timeout=1000 * 60 * 60 ) => {
    console.log("setstore",timeout)
    const obj = {
        data,
        expire: new Date().getTime() + timeout
    };
    localStorage.setItem(name, JSON.stringify(obj));
};

//读取缓存 且比较时间戳是否过期
export const localStorageGet = name => {
    const storage = localStorage.getItem(name);
    const time = new Date().getTime();
    let result = null;
    if (storage) {
        const obj = JSON.parse(storage);
        if (time < obj.expire) {
            result = obj.data;
        } else {
            localStorage.removeItem(name);
        }
    }
    return result;
};

//指定删
export const localStorageDelete = name =>{
    localStorage.removeItem(name);
}
//全删
export const localStorageFlush = () => {
    localStorage.clear();
}

// 使用
//存
// localStorageSet('weather', data)

//取（返回null则过期）
// localStorageGet('weather')



