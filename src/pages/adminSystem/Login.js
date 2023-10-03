import React from 'react'
import {connect} from 'react-redux';
import {localStorageSet} from "../../localStorage/localStorage";
import {Form, Input, Button, message} from 'antd'
import {UserOutlined, UnlockOutlined} from '@ant-design/icons';
import {loginApi} from "../../server/user";
import './css/login.css'

const {REACT_APP_CACHE_TIME} = process?.env || {}

// 获取表单
function Login(props) {
  const [form] = Form.useForm();

  const handleSubmit = (e) => {
    form.validateFields()
      .then(async (values) => {
        loginApi(values).then(res => {
            if (res.code !== 0 || res.data === '') {
              message.error(`登录失败: ${res.msg}`);
              return;
            }
            localStorageSet("token", res.data, +REACT_APP_CACHE_TIME)
            localStorageSet("username", values.username, +REACT_APP_CACHE_TIME)
            message.success('登录成功!');
            props.history.push('/admin/user/list')
          }
        ).catch(
          (error) => console.log(error)
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div className="login_body_div">
        <Form form={form} className="login_form">
          <h3 className="login_title">系统登录</h3>
          <Form.Item name="username" rules={[{required: true, message: '请输入用户名字'}]}>
            <Input placeholder="请输入用户名" className="login_input" prefix={<UserOutlined/>}/>
          </Form.Item>
          <Form.Item name="password" rules={[{required: true, message: '请输入密码'}]}>
            <Input.Password placeholder="请输入密码" className="login_input" prefix={<UnlockOutlined/>} onKeyDown={(e) => {
              if (e.keyCode === 13) {
                handleSubmit(e)
              }
            }}/>
          </Form.Item>
          <Button onClick={(e) => handleSubmit(e)} type="primary" className="login_submit_button">
            登录
          </Button>

        </Form>
      </div>
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    // token: state.userReducer.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // loginChangeAction: (token) => dispatch({ type:"user_change_token",token: token })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
