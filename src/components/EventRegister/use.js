// 使用说明
// 作用:判断鼠标点击是否在所在 ref 区域的位置，不在把ref所在div关闭

import React, {useRef, useState} from 'react'
import EventRegister from './EventRegister'

function Index() {
    const currentRef = useRef()
    const [show,setShow]=useState(true)
    return (
        <div>
            <EventRegister
                eventName="click"
                func={_ => {
                    const node = currentRef.current;
                    if (node && node.contains(_.target)) return
                    setShow(false)
                }}
                id={'FilterSelect' + props.type}
            />
            {
                show && <div ref={currentRef}>
                    <ul>

                    </ul>
                </div>
            }
        </div>
    )
}

export default Index;