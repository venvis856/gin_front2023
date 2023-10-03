import React, {useEffect, useState} from 'react'
import {
    Button,
    Col,
    DatePicker,
    Drawer,
    Form,
    Input,
    message,
    Modal,
    Pagination,
    Row,
    Select,
    Table,
    Tooltip,
    Popconfirm,
} from 'antd';
import {SearchOutlined, PlusOutlined} from '@ant-design/icons';
import {listApi, deleteApi} from "../../../server/permission";
import Edit from "./Edit"
import {getSiteId} from "../../../localStorage/siteinfo";

function List(props) {  
    const [editVisible, setEditVisible] = useState(false)
    const [editInfo, setEditInfo] = useState({})
    const [editKey,setEditKey]=useState(0)

    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 18,
        },
        style: {
            width: '100%',
        },
    };

    const columns = [
        {title: 'id', dataIndex: 'id', width: 80, align: 'center', sorter: true},
        {title: '权限名', dataIndex: 'permission_name', width: 80, align: 'center'},
        {title: '权限code', dataIndex: 'permission_code', width: 80, align: 'center'},
        {title: '父权限code', dataIndex: 'father_permission_code', width: 80, align: 'center'},
        {
            title: '类型', dataIndex: 'type', width: 80, align: 'center',
            render: (txt, record) => {
                if (txt === 1) {
                    return "菜单"
                } else if (txt === 2) {
                    return "普通"
                }
            }
        },
        {
            title: '状态', dataIndex: 'status', width: 80, align: 'center',
            render: (txt, record) => {
                if (txt === 1) {
                    return <span style={{color:'#16ba39'}}>正常</span>
                } else if (txt === 5) {
                    return <span style={{color:'#dc2525'}}>禁用</span>
                }
            }
        },
        {
            title: '操作', dataIndex: 'username', width: 80, align: 'center',
            render: (txt, record, index) => { //txt 根据上面dataIndex确定具体该行的某个值, record 整条, index 从0开始的下标
                return (
                    <div>
                        <Button type="primary" shape="round" size="small" onClick={() => {
                            setEditInfo(record)
                            setEditVisible(true)
                            setEditKey(Math.random)
                        }}>编辑</Button>
                        <Popconfirm title="确定删除此项?" onCancel={() => console.log('用户取消删除')}
                                    onConfirm={() => {
                                        console.log("用户确认删除", txt, record, index)
                                        //此处调用api接口进行操作
                                        setloading(true)
                                        deleteApi(record).then(
                                            (res) => {
                                                if (res.code !== 0) {
                                                    message.error(`删除失败: ${res.msg}`);
                                                    return;
                                                }
                                                message.success('删除成功!');
                                                fetchItems()
                                            }
                                        ).catch(
                                            (error) => console.log(error)
                                        )
                                        setloading(false)
                                    }}>
                            <Button style={{margin: "0 1rem"}} type="danger" size="small">删除</Button>
                        </Popconfirm>
                    </div>
                );
            }
        }
    ];


    //是否为加载中
    const [loading, setloading] = useState(false)

    const {Option} = Select;
    //table数据及分页
    const [pagination, setPagination] = useState({
        reload: true, // 用于触发查询
        items: [],
        total: 0,
        pageSize: 10,
        currentPage: 1,
        orderBy: '',
        orderByType: '',
    })
    //查询条件
    const [search, setSearch] = useState({
        id: {operator: '=', value: '', type: ''},
        permission_name: {operator: 'like', value: '', type: 'both'},
        permission_code: {operator: 'like', value: '', type: 'both'},
        type: {operator: '=', value: '', type: ''},
        status: {operator: '=', value: '', type: ''},
        site_id:{operator:'=',value:getSiteId(),type:''}
    })

    // 初始化时执行一次
    useEffect(() => {
        fetchItems()
        // console.log(props,999999,props.location.state,msgBool)
    }, [pagination.pageSize, pagination.currentPage, pagination.orderBy, pagination.orderByType, pagination.reload])

    // 点击查询
    const handleSearch = () => {
        setPagination({...pagination, currentPage: 1, reload: !pagination.reload})
    }

    // 获取数据
    function fetchItems(callback) {
        const data = {}
        data.pageIndex = pagination.currentPage
        data.limit = pagination.pageSize
        if (pagination.orderBy !== '') {
            data.orderBy = pagination.orderBy
        }
        if (pagination.orderByType !== '') {
            data.orderByType = pagination.orderByType
        }
        let tmpSearch = {}
        for (let key in search) {
            if (search[key].value !== '') {
                tmpSearch[key] = search[key]
            }
        }
        data.search = tmpSearch
        setloading(true)
        listApi(data).then(
            (res) => {
                if (res.code !== 0) {
                    message.error(`查询失败: ${res.msg}`);
                    return;
                }
                setPagination({
                    ...pagination,
                    items: res.data.items,
                    total: res.data.total,
                })
                if (typeof callback === 'function') callback()
            }
        ).catch(
            (error) => console.log(error)
        )
        setloading(false)
    }

    // 根据传参修改查询条件
    function onSearch(index, val) {
        if (search[index]) {
            search[index].value = val;
            setSearch({...search, [index]: search[index]});
        }
    }

    // 设置搜索查询条件
    function handleChangeInput(e, name) {
        // 通过name值设置搜索值
        onSearch(name, e.target.value);
    }

    // 设置单选框搜索查询条件
    function handleChangeSelect(value, name) {
        if (typeof value === 'undefined') {
            value = ''
        }
        // 通过name值设置搜索值
        onSearch(name, value);
    }

    // 分页改变时
    const handleChangePagination = (page, pageSize) => {
        setPagination({...pagination, currentPage: page, pageSize: pageSize})
    }

    // table 更改
    const handleTableChange = (tablePagination, filters, sorter) => {
        let orderByType = (sorter["order"] === "ascend" ? "asc" : "desc")
        let orderBy = typeof sorter['field'] !== 'undefined' ? "" + sorter['field'] : ''
        setPagination({...pagination, orderBy: orderBy, orderByType: orderByType})
    }

    return (
        <React.Fragment>
            <div className="search_body">
                <div className="search_item">
                    <div className="search_item_font">id:</div>
                    <Input className="search_item_input" allowClear placeholder="请输入id" onChange={(e) => handleChangeInput(e, 'id')}/>
                </div>
                <div className="search_item">
                    <div className="search_item_font">权限名:</div>
                    <Input className="search_item_input" allowClear placeholder="请输入权限名"
                           onChange={(e) => handleChangeInput(e, 'permission_name')}/>
                </div>
                <div className="search_item">
                    <div className="search_item_font">权限code:</div>
                    <Input className="search_item_input" allowClear placeholder="请输入权限code"
                           onChange={(e) => handleChangeInput(e, 'permission_code')}/>
                </div>
                <div className="search_item">
                    <div className="search_item_font">类型:</div>
                    <Select
                        showSearch
                        allowClear
                        style={{width: 200}}
                        placeholder="请筛选类型"
                        optionFilterProp="children"
                        onChange={(value) => handleChangeSelect(value, 'type')}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="1">菜单</Option>
                        <Option value="2">普通</Option>
                    </Select>
                </div>
                <div className="search_item">
                    <div className="search_item_font">状态:</div>
                    <Select
                        showSearch
                        allowClear
                        style={{width: 200}}
                        placeholder="请筛选状态"
                        optionFilterProp="children"
                        onChange={(value) => handleChangeSelect(value, 'status')}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="1">正常</Option>
                        <Option value="5">禁用</Option>
                    </Select>
                </div>
                <div className="search_item">
                    <Button type="primary" icon={<SearchOutlined/>} loading={loading}
                            style={{marginRight: '8px'}} shape="round"
                            onClick={handleSearch}>
                        搜索
                    </Button>
                    <Button type="primary" icon={<PlusOutlined/>} loading={loading} style={{marginRight: '8px'}}
                            onClick={() => {
                                setEditInfo({})
                                setEditVisible(true)
                                setEditKey(Math.random)
                            }}>
                        新增
                    </Button>
                </div>
            </div>
            <Table
                columns={columns}
                rowKey={(item) => item.id} // 列表行key
                dataSource={pagination.items}
                pagination={false}
                loading={loading}
                bordered
                onChange={(pagination, filters, sorter) => handleTableChange(pagination, filters, sorter)}
                // scroll={{ y: 'calc(100vh - 360px)' }}
            />
            <Pagination
                style={{padding: '20px 20px 0 20px', float: 'right'}}
                total={pagination.total}
                pageSize={pagination.pageSize}
                current={pagination.currentPage}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => `共 ${total} 条`}
                onChange={(page, pageSize) => handleChangePagination(page, pageSize)}
            />
            {
                editVisible &&
                <Edit key={editKey} fetchItems={fetchItems} setEditVisible={setEditVisible} editInfo={editInfo} />
            }
        </React.Fragment>
    )
}

export default List;