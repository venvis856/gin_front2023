import Login from "../pages/adminSystem/Login";
import PageNotFound from "../pages/adminSystem/PageNotFound";
import UserList from "../pages/adminSystem/user/List";
import UserEdit from "../pages/adminSystem/user/Edit";
import PermissionList from "../pages/adminSystem/permission/List";
import PermissionEdit from "../pages/adminSystem/permission/Edit";
import RoleList from '../pages/adminSystem/role/List'
import RoleEdit from '../pages/adminSystem/role/Edit'

import {AreaChartOutlined,SlackSquareOutlined} from '@ant-design/icons';

export const mainRoutes = [
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/404',
        component: PageNotFound
    },
]

export const adminRoutes=[
    // {
    //     path: '/admin/dashboard',
    //     component: Dashboard,
    //     isShow:true,
    //     title:'看板',
    //     permission:"",
    //     icon:<AreaChartOutlined />,
    // },

    // 工作台
    // {
    //     path: '/admin/article/list',
    //     component: PageList,
    //     isShow:false,
    //     title:'文章列表',
    //     permission:"article_list",
    //     icon:<SlackSquareOutlined />,
    // },

]

export const setRoutes=[
    // 设置
    {
        path: '/admin/user/list',
        component: UserList,
        exact: true, //标识全匹配才会走这里进来
        isShow:true,
        title:'用户管理',
        permission:"user_list",
        icon:<SlackSquareOutlined />,
    },
    {
        path: '/admin/user/edit/:id?',
        component: UserEdit,
        isShow:false,
        title:'用户编辑',
        permission:"",
        icon:<SlackSquareOutlined />,
    },
    {
        path: '/admin/role/list',
        component: RoleList,
        exact: true, //标识全匹配才会走这里进来
        isShow:true,
        title:'角色管理',
        permission:"role_list",
        icon:<SlackSquareOutlined />,
    },
    {
        path: '/admin/permission/list',
        component: PermissionList,
        exact: true, //标识全匹配才会走这里进来
        isShow:true,
        title:'权限管理',
        permission:"permission_list",
        icon:<SlackSquareOutlined />,
    },
    {
        path: '/admin/permission/edit/:id?',
        component: PermissionEdit,
        isShow:false,
        title:'权限编辑',
        permission:"",
        icon:<SlackSquareOutlined />,
    },

]
