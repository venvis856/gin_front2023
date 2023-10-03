import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom';
import {adminRoutes, setRoutes} from '../../router';
import {Breadcrumb, Layout, Menu, Dropdown, message} from 'antd';
import {
  DownOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MailOutlined,
  ContainerOutlined
} from '@ant-design/icons';
import {localStorageGet, localStorageSet, localStorageFlush} from '../../localStorage/localStorage'
import cx from 'classnames'
import {get_menu_by_user} from '../../server/permission'
import {siteListAllInfoApi, getPermissionByUser} from '../../server/select'
import {getSiteId} from "../../localStorage/siteinfo";
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import {Inspector} from 'react-dev-inspector'
import copy from 'copy-to-clipboard'
import WaterMark from 'watermark-component-for-react';

const {REACT_APP_CACHE_TIME} = process?.env || {}
const {Header, Content, Sider} = Layout;
const {SubMenu} = Menu;

const menu = (props) => (
  <Menu>
    <Menu.Item key="out" icon={<UserOutlined/>} onClick={(e) => handleMenuClick(e, props)}>
      退出
    </Menu.Item>
  </Menu>
);


function handleMenuClick(e, props) {
  switch (e.key) {
    case "out":
      localStorageFlush()
      props.history.push("/login")
      message.success("退出登录成功")
      break;
  }
}

const tags = {
  work: 'work',
  config: 'config',
}

function Index(props) {
  const [menuStretch, setMenuStretch] = useState(false) // 菜单折叠控制
  const [leftMenu, setLeftMenu] = useState([])
  const [siteList, setSiteList] = useState([])
  const [layoutKey, setLayoutKey] = useState(0)
  const [siteInfo, setSiteInfo] = useState(localStorageGet("siteInfo"))
  const [configRouter, setConfigRouter] = useState([])
  const [workRouter, setWorkRouter] = useState([])
  const [tag, setTag] = useState(tags.work)

  useEffect(() => {
    localStorageSet("siteInfo", siteInfo, +REACT_APP_CACHE_TIME)
    initMenu(siteInfo).then()
  }, [siteInfo])

  useEffect(() => {
    getSiteList().then()
  }, [])

  const getSiteList = async () => {
    let siteArr = await siteListAllInfoApi()
    setSiteList(siteArr)
    if (siteArr && siteArr.length > 0 && getSiteId() === -1) {
      setSiteInfo(siteArr[0])
    }
  }

  const filterPermission = (routes, permissionMenu) => {
    let tmpRouter = routes.concat()
    tmpRouter = tmpRouter.map(item => {
      if (permissionMenu.find(arrItem => arrItem.permission_code === item.permission)) {
        item.isShow = true
      } else {
        item.isShow = false
      }
      return item
    })
    tmpRouter = tmpRouter.filter(item => item.isShow)
    return tmpRouter
  }

  // 更新菜单
  const initMenu = async (siteInfo) => {
    console.log(siteInfo, "site_indo")
    if (!siteInfo) return
    try {
      let res = await get_menu_by_user({token: localStorageGet("token"), site_id: siteInfo.id})
      let permissionMenu = res.data
      console.log(permissionMenu, "permisiomenu")
      // 工作台路由
      let tmpRouter = filterPermission(adminRoutes, permissionMenu)
      console.log(tmpRouter, "tmpRouter")
      setWorkRouter(tmpRouter)
      setLeftMenu(tmpRouter)
      // 设置路由
      let setRouter = filterPermission(setRoutes, permissionMenu)
      console.log(setRouter, "===setRouter")
      setConfigRouter(setRouter)
      // 判断切换站点左边菜单是否需要更新，兼容刷新
      if (tmpRouter.length > 0) {
        let has = false
        tmpRouter.forEach(item => {
          if (item.path === props.history.location.pathname) {
            props.history.push(item.path)
            has = true
          }
        })
        if (!has) {
          props.history.push(tmpRouter[0].path)
        }
      }
    } catch (e) {
      console.log(e, "菜单初始化失败")
    }
    setLayoutKey(Math.random())
  }
  console.log(siteList, "===siteList")
  return (
    <Layout key={layoutKey}>
      <Sider trigger={null} collapsible collapsed={menuStretch}>
        <div className="side_header">
          {process?.env?.REACT_APP_ENV === 'dev' ? 'init' : '系统'}
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          selectedKeys={props.history.location.pathname}
          className="side"
          // theme="dark"
        >
          {
            leftMenu?.length > 0 && leftMenu.map(route => {
              return (
                <Menu.Item key={route.path} onClick={p => {
                  props.history.push(p.key)
                }}>
                  {route.icon}
                  {!menuStretch && route.title}
                </Menu.Item>
              )
            })
          }
          {/*<SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">*/}
          {/*    <Menu.Item key="1" >Option 5</Menu.Item>*/}
          {/*    <Menu.Item key="6" >Option 6</Menu.Item>*/}
          {/*    <Menu.Item key="7">Option 7</Menu.Item>*/}
          {/*    <Menu.Item key="8">Option 8</Menu.Item>*/}
          {/*</SubMenu>*/}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className={cx("site-layout-background", "header_bg")}>
          <div onClick={() => setMenuStretch(!menuStretch)}>
            {menuStretch ? <MenuUnfoldOutlined className="trigger"/> :
              <MenuFoldOutlined className="trigger"/>}
          </div>
          <div className="nav_header_left_div">
            {
              <div
                className={cx("nav_menu_div", {"nav_select_menu_div": tag === tags.work})}
                onClick={() => {
                  setLeftMenu(workRouter)
                  setTag(tags.work)
                }}>
                工作台
              </div>
            }
            {
              !!configRouter.length && <div
                className={cx("nav_menu_div", {"nav_select_menu_div": tag === tags.config})}
                onClick={() => {
                  setLeftMenu(configRouter)
                  setTag(tags.config)
                }}>
                设置
              </div>
            }
          </div>
          <div className="nav_header_right">
            <Dropdown overlay={() => {
              return (
                <Menu>
                  {
                    siteList?.length > 0 && siteList.map(item => {
                      return <Menu.Item key={item.id} icon={<UserOutlined/>} onClick={(e) => {
                        setSiteInfo(item)
                      }}>
                        {item.site_name}
                      </Menu.Item>
                    })
                  }
                </Menu>
              )
            }}>
              <a onClick={e => e.preventDefault()} className="nav_right_person">
                {
                  (siteInfo || {}).id === 0 &&
                  <div className="site_font" style={{color: "rgba(0, 0, 0, 0.85)"}}>请选择站点</div>
                }
                {
                  (siteInfo || {}).id !== 0 &&
                  <div
                    className="site_font"> 站点:{(siteInfo || {}).site_name || ""}</div>
                }
              </a>
            </Dropdown>
            <Dropdown overlay={() => menu(props)}>
              <a onClick={e => e.preventDefault()} className="nav_right_person">
                {localStorageGet("username")} <DownOutlined/>
              </a>
            </Dropdown>
          </div>
        </Header>
        {/* 面包屑 */}
        {/*<Breadcrumb style={{padding: '16px'}}>*/}
        {/*    <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
        {/*    <Breadcrumb.Item>List</Breadcrumb.Item>*/}
        {/*    <Breadcrumb.Item>App</Breadcrumb.Item>*/}
        {/*</Breadcrumb>*/}
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            backgroundColor: '#F0F2F5'
          }}
        >
          <WaterMark content={`内部资料,请勿外传-${localStorageGet("username")}`}>
            <ErrorBoundary>
              {props.children}
            </ErrorBoundary>
          </WaterMark>
        </Content>
      </Layout>
    </Layout>
  )
}

export default withRouter(Index);
