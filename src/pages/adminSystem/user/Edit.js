import React, {useEffect, useState} from 'react'
import {Form, Card, Input, Button, Radio, Row, Col, Select, message, Modal} from 'antd'
import {updateApi, addApi} from "../../../server/user";
import {listApi as roleListApi} from '../../../server/role'

function Edit(props) {
  // const [confirmLoading,setConfirmLoading]=useState(false)
  const [roleOptions, setRoleOptions] = useState(0)

  const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
  };
  const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
  };

  // 获取表单
  const [form] = Form.useForm();
  // 编辑页数据
  const editInfo = props.editInfo || {}

  const handleSubmit = () => {
    form.validateFields()
      .then(async (values) => {
        values['id'] = editInfo.id || 0
        let addOrUpdate = editInfo.id ? updateApi : addApi
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
          (error) => console.log(error)
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleCancle = () => {
    // message.success('取消操作');
    props.setEditVisible(false)
  }

  useEffect(() => {
    roleListApi({
      pageIndex: 1,
      limit: 9999
    }).then(res => {
      console.log(res, "===res")
      let newData = []
      if (res?.data?.items?.length > 0) {
        res?.data?.items.forEach(item => {
          newData.push({
            label: item.role_name,
            value: item.id,
          })
        })
      }
      setRoleOptions(newData)
    })
  }, [])

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
      <Form  {...layout} style={{width: '50%'}} form={form}>
        <Form.Item label="用户名" name="username" rules={[{required: true, message: '请输入用户名字'}]}
                   initialValue={editInfo.username || ''}>
          <Input placeholder="请输入用户名"/>
        </Form.Item>
        <Form.Item label="真实名字" name="realname" rules={[{required: true, message: '请输入真实名字'}]}
                   initialValue={editInfo.realname || ''}>
          <Input placeholder="请输入真实名字"/>
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{required: true, message: '请输入密码'}]}>
          <Input.Password placeholder="请输入密码"/>
        </Form.Item>
        <Form.Item>
          <Select
            mode="multiple"
            allowClear
            style={{width: '100%'}}
            placeholder="Please select"
            onChange={() => {

            }}
            options={roleOptions}
          />
        </Form.Item>

        <Form.Item label="状态" name="status" rules={[{required: true, message: '请选择状态'}]}
                   initialValue={editInfo.status || 1}>
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
