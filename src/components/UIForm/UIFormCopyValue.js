import React, { useState } from 'react'
import copy from 'copy-to-clipboard'
import PropTypes from 'prop-types'
import './index.scss'

/**
 * 点击复制的用户标签。点击就  会复制value
 * @example
 *   <UIFormLabel label="微信号">
 *     <UIFormCopyValue label="微信号" value="sky1998"/>
 *   </UIFormLabel>
 */
// eslint-disable-next-line react/prop-types
const UIFormCopyValue = ({ value, label = '', starSpan = false }) => {
  const [isCopy, setIsCopy] = useState(false)

  const onCopy = () => {
    copy(value)
    setIsCopy(true)
  }

  const onHoverOut = () => {
    setIsCopy(false)
  }

  return (
    <div className="title-right copy-down" onClick={onCopy} onMouseOut={onHoverOut}>
      {/*<span title={isCopy ? '已复制' : `点击复制${label}`}>{value}</span>*/}
      <span>{value}</span>
      {starSpan && <i className="iconfont icon-247" style={{ color: 'red' }} />}
      <div className="suspend">
        <span>{isCopy ? '已复制' : `点击复制${label}`}</span>
      </div>
    </div>
  )
}

UIFormCopyValue.propTypes = {
  /** 标签 */
  label: PropTypes.string,
  /** 值 */
  value: PropTypes.any,
}

export default UIFormCopyValue
