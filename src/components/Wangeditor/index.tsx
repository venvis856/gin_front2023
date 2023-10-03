// @ts-ignore
import React, { FC, useState, useEffect } from 'react'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import E from 'wangeditor'
import lodash from 'lodash'
import { Boot, DomEditor, IModuleConf, IToolbarConfig, IDomEditor, IEditorConfig } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { Spin } from 'antd'


import ChangePic from './changePic'
import loadingReducer from '../../store/reducers/loadingReducer'
import { GetLoading } from './updateLoading'

interface WangeditorProps {
  value?: string,
  onChange?: Function,
  wangEditorLoading?:boolean,
}

const Wangeditor: FC<WangeditorProps> = props => {
  const {
    value = '',
    onChange
  } = props
  const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法
  // useEffect(() => {
  //   // 创建实例
  //   // 注：class写法需要在componentDidMount 创建编辑器
  //   editor = new E("#editor")
  //   // 设置编辑区域高度为 500px
  //   editor.config.height = 500
  //   // 内容改变设置内容
  //   editor.config.onchange = (newHtml) => {
  //     onChange && lodash.isFunction(onChange) && onChange(newHtml)
  //   }
  //   editor.create()
  //   return () => {
  //     editor.destroy()
  //   }
  // }, [])

  // useEffect(() => {
  //   if (editor) {
  //     editor.txt.html(value)
  //   }
  // }, [value])

  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  // useEffect(()=>{
  // onChange(editor?.getHtml() || "")
  // },[editor?.getHtml()])

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}  // TS 语法
  toolbarConfig.insertKeys = {
    index: 25, // 插入的位置，基于当前的 toolbarKeys
    keys: ['change_pic']
  }

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {    // TS 语法
    // const editorConfig = {                         // JS 语法
    placeholder: '请输入内容...',
    MENU_CONF: {}
  }

  useEffect(() => {
    // 注册新菜单
    const menu1Conf = {
      key: 'change_pic', // 定义 menu key ：要保证唯一、不重复（重要）
      factory() {
        return new ChangePic() // 把 `YourMenuClass` 替换为你菜单的 class
      }
    }
    Boot.registerMenu(menu1Conf)
  }, [])

  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Spin tip='Loading...' spinning={GetLoading() || false}>
          <Toolbar
            editor={editor}
            defaultConfig={toolbarConfig}
            mode='default'
            style={{ borderBottom: '1px solid #ccc' }}
          />
          <Editor
            defaultConfig={editorConfig}
            value={value}
            onCreated={setEditor}
            // @ts-ignore
            onChange={editor => onChange(editor.getHtml())}
            mode='default'
            style={{ height: '500px', overflowY: 'hidden' }}
          />
        </Spin>
      </div>
      {/*<div style={{ marginTop: '15px' }}>*/}
      {/*  {value}*/}
      {/*</div>*/}
    </>

  )
}


export default Wangeditor;
