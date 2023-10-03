const defaultState = {
    templateList:[],
    classifyList:[],
    productList:[],
    authorList:[],
    tagList:[],
};

//reducers可以接收state但是绝不能修改state
//reducers不能有异步操作也不能有与时间相关的操作，也不能对接收的参数进行修改
//返回纯函数，纯函数指的是：给定固定输入，则输出固定，而且不会有任何副作用
const selectReducer=(state = defaultState,action) => {
    // state是上一个store中存储的数据，action是用户发过来的操作请求
    // 1、JSON.parse()用于从一个字符串中解析出json对象
    // 2、JSON.stringify()用于从一个对象解析出字符串
    switch (action.type) {
        case "select_change_template":
            return {
                ...state,
                templateList:action.data,
            };
        case "select_change_classify":
            return {
                ...state,
                classifyList:action.data,
            };
        case "select_change_product":
            return {
                ...state,
                productList:action.data,
            };
        case "select_change_author":
            return {
                ...state,
                authorList:action.data,
            };
        case "select_change_tag":
            return {
                ...state,
                tagList:action.data,
            };
        default:
            return state;
    }
}

export default selectReducer