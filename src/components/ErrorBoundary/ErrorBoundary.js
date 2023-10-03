import { PureComponent } from 'react'
import * as PropTypes from 'prop-types'

class ErrorBoundary extends PureComponent {
  state = {
    error: null,
    info: null,
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.log('ErrorBoundary.getDerivedStateFromError', error)
    return { error }
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
    console.error('ErrorBoundary.componentDidCatch',"err======info", error, info)
    //
    // window.aegis.error({
    //   type: '组件渲染失败',
    //   reportData: this.props.reportData,
    //   error,
    //   info,
    // })
    this.setState({ error, info })
  }

  render() {
    if (this.state.error) {
      // You can render any custom fallback UI
      return <h1>{this.props.fallback || '页面获取失败，请刷新后重试'}</h1>
    }
    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  fallback: PropTypes.string,
  children: PropTypes.any,
  reportData: PropTypes.any,
}

export default ErrorBoundary
