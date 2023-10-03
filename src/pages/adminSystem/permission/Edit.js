import React, {useEffect, useState} from 'react'
import {Form, Card, Input, Button, Radio, Row, Col, message,Select, Modal} from 'antd'
import {updateApi,addApi} from "../../../server/permission";
import {getSiteId} from "../../../localStorage/siteinfo";

function Edit(props) {
    // const [confirmLoading,setConfirmLoading]=useState(false)

    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const {Option} =Select
    // 获取表单
    const [form] = Form.useForm();
    // 编辑页数据
    const editInfo=props.editInfo||{}

    const handleSubmit = () => {
        form.validateFields()
            .then(async (values) => {
                values['id']=editInfo.id ||0
                values["site_id"] = getSiteId()
                let addOrUpdate = editInfo.id?updateApi:addApi
                addOrUpdate(values).then(
                    (res) => {
                        if (res.code !== 0) {
                            message.error(`操作失败: ${res.msg}`);
                            return;
                        }
                        message.success('操作成功!');
                        props.setEditVisible(false)
                        props.fetchItems()
                    }
                ).catch(
                    (error)=>console.log(error)
                );
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleCancle=()=>{
        // message.success('取消操作');
        props.setEditVisible(false)
    }

    return (
        <Modal
            title="编辑"
            visible={true}
            onOk={handleSubmit}
            // confirmLoading={confirmLoading}
            onCancel={handleCancle}
            centered
            width={1000}
            maskClosable={false}
        >
            <Form  {...layout} style={{width:'50%'}}  form={form}>
                <Form.Item label="权限名" name="permission_name" rules={[{required: true, message: '请输入'}]} initialValue={editInfo.permission_name ||''}>
                    <Input placeholder="请输入"/>
                </Form.Item>
                <Form.Item label="权限符" name="permission_code" rules={[{required: true, message: '请输入'}]} initialValue={editInfo.permission_code ||''}>
                    <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item label="父权限符" name="father_permission_code" rules={[{required: true, message: '请输入'}]} initialValue={editInfo.father_permission_code ||''}>
                    <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item label="类型" name="type" rules={[{required: true, message: '请选择'}]} initialValue={editInfo.type || 1}>
                    <Select
                        showSearch
                        allowClear
                        style={{width: 200}}
                        placeholder="请选择"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value={1}>菜单</Option>
                        <Option value={2}>普通</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="状态" name="status" rules={[{required: true, message: '请选择状态'}]} initialValue={editInfo.status || 1}>
                    <Radio.Group>
                        <Radio value={1}>正常</Radio>
                        <Radio value={5}>禁用</Radio>
                    </Radio.Group>
                </Form.Item>
                {/*<Form.Item {...tailLayout}>*/}
                {/*    <Button onClick={(e) => handleSubmit(e)} type="primary" style={{ marginRight: '8px' }}>*/}
                {/*        提交*/}
                {/*    </Button>*/}
                {/*    <Button onClick={() => handleCancle()} type="primary" style={{ marginRight: '8px' }}>*/}
                {/*        取消*/}
                {/*    </Button>*/}
                {/*</Form.Item>*/}
            </Form>
        </Modal>
    )
}

export default Edit;