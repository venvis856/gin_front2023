import { IButtonMenu, IDomEditor, SlateEditor, SlateElement, SlateNode } from '@wangeditor/editor'
import { change_online_pic } from '../../server/picture'
import lodash from 'lodash'
import { message } from 'antd'
import { connect } from 'react-redux'
import { SetLoading } from './updateLoading'

class ChangePic implements IButtonMenu {   // TS 语法
// class MyButtonMenu {                       // JS 语法

  constructor() {
    this.title = '更换图片地址' // 自定义菜单标题
    // this.iconSvg = '<svg>...</svg>' // 可选
    this.tag = 'button'
  }

  // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
  getValue(editor: IDomEditor): string | boolean {   // TS 语法
    // getValue(editor) {                              // JS 语法
    SetLoading(true)
    let selectNode = {}
    let src=""
    const nodeEntries = SlateEditor.nodes(editor, {
      match: (node: SlateNode) => {  // TS syntax
        // match: (node) => {          // JS syntax
        if (SlateElement.isElement(node)) {
          if (node.type === 'paragraph') {
            return true // 匹配 paragraph
          }
        }
        return false
      },
      universal: true
    })

    if (nodeEntries == null) {
      console.log('当前未选中的 paragraph')
    } else {
      for (let nodeEntry of nodeEntries) {
        const [node, path] = nodeEntry
        console.log('选中了 paragraph 节点', node)
        selectNode = node
        // console.log('节点 path 是', path)
      }
    }
    // 找出图片
    if (selectNode && selectNode.children && selectNode.children.length > 0) {
      selectNode.children.forEach(item => {
        if (item.type==='image') {
          src=item.src
        }
      })
    }
    return src
    // return editor.getSelectionText() || ''
  }

  // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
  isActive(editor: IDomEditor): boolean {  // TS 语法
    // isActive(editor) {                    // JS 语法
    return false
  }

  // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
  isDisabled(editor: IDomEditor): boolean {   // TS 语法
    // isDisabled(editor) {                     // JS 语法
    return false
  }

  // 点击菜单时触发的函数
  exec(editor: IDomEditor, value: string | boolean) {   // TS 语法
    // exec(editor, value) {                              // JS 语法
    if (this.isDisabled(editor)) return
    // console.log(editor.select.toString(), '===return', value)
    change_online_pic(value).then(res=>{
      console.log(res,"=====res",value)
      if(res.code===0){
       // res.data
        let html=editor.getHtml()
        // console.log(html,"======html",typeof html)
        html=lodash.replace(html,value,res.data)
        // html=lodash.replace(html,value,"https://cdn.wwads.cn/creatives/COi3HnBnyFF545MHJE1dI9uO9r1Ja4D4p0fvTPYE.png")
        // console.log(html,"======html222",typeof html)
        editor.setHtml(""+html)
        message.success("更新图片成功")
        // html.replaceAll(value,res.data)
        // editor.setHtml(html)
      }
    }).catch(err=>{
      message.error("更新图片失败",err)
      console.log("更换图片失败===",err)
    }).finally(res=>{
      SetLoading(false)
    })

    // editor.insertText(value) // value 即 this.value(editor) 的返回值
  }

}

export default ChangePic;