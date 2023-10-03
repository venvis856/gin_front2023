import React ,{useState,useEffect} from 'react'
import { Drawer, Button,Checkbox ,message} from 'antd';
import {get_all_permission_by_role, listApi,role_add_permission} from '../../../server/permission'
import {getSiteId} from "../../../localStorage/siteinfo";
import lodash from 'lodash'
import {array_remove, array_unique} from '../../../utils/array'

function OperatePermission(props) {
    const {onClose,visible=false,info={}} =props
    console.log(info,"info")
    const [permissionNameObj,setPermissionNameObj]=useState({})
    const [permissionListObj,setPermissionListObj]=useState({})
    const [resultPermission,setResultPermission]=useState([])

    useEffect(()=>{
        if (!visible) return
        listApi({
            pageIndex:1,
            limit:99999,
        }).then(res=>{
            if (res.data && res.data.items && res.data.items.length>0){
                let newObj={}
                let labelObj={}
                res.data.items.forEach(item=>{
                    if(!newObj.hasOwnProperty(item.father_permission_code)){
                        newObj[item.father_permission_code]=[]
                    }
                    newObj[item.father_permission_code].push(item.permission_code)
                    labelObj[item.permission_code]=item.permission_name
                })
                setPermissionListObj(newObj)
                setPermissionNameObj(labelObj)
            }
        })
        // 获取已有权限
        get_all_permission_by_role({
            role_id:info.id,
            site_id:getSiteId()
        }).then(res=>{
            if(res?.data?.length>0){
                let newData= []
                res.data.forEach(item=>{
                    newData.push(item.permission_code)
                })
                setResultPermission(newData)
            }
        })
    },[visible])

    console.log(permissionNameObj,permissionListObj,"permissionListObj")
    console.log(resultPermission,"=====res")

    const onChange=(e,value)=>{
        let data=lodash.cloneDeep(resultPermission)
        if(e.target.checked){
            data.push(value)
        }else{
             data=array_remove(data,value)
        }
        data=array_unique(data)
        setResultPermission(data)
    }

    const handleSubmit=()=>{
        console.log(resultPermission,"===submit--param")
        role_add_permission({
            role_id:info.id,
            permission_code:resultPermission,
            site_id:getSiteId(),
        }).then(res=>{
            console.log(res,"===submit")
            if(res.code===0){
                onClose()
                message.success('保存成功');
            }else{
                message.error('保存失败');
            }
        }).catch(err=>{
            message.error('保存失败',err);
        })
    }

    return (
        <div style={{overflow:"auto"}}>
            <Drawer width={800} title={`角色权限-${info.role_name}`} placement="right" onClose={onClose} visible={visible}>
                {
                    Object.keys(permissionListObj).map((key) => {
                        if(key==='') return null
                        return <div className="operate_permission_div" key={key}>
                            <div>{permissionNameObj[key]}</div>
                            <br/>
                            {
                                permissionListObj[key].map(item=>{
                                    return <Checkbox key={item} checked={resultPermission.indexOf(item)!==-1} onChange={(e)=>onChange(e,item)}>{permissionNameObj[item]}</Checkbox>
                                })
                            }
                        </div>
                    })
                }
                <div className="operate_permission_button_div">
                    <Button type="primary" onClick={handleSubmit}>保存</Button>
                </div>
            </Drawer>
        </div>
    )
}

export default OperatePermission;
