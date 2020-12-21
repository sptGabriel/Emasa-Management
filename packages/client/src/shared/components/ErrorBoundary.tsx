import React, {Component, Requireable} from 'react'
import PropTypes from 'prop-types'
import ErrorFallback from './ErrorFallBack'

class ErrorBoundary extends Component {
  static propTypes: {
    children: any
  }

  state = {
    error: '',
    errorInfo: '',
    hasError: false,
  }

  static getDerivedStateFromError(error: Error) {
    console.log('a')
    console.log(error, 'getderived')
    return {hasError: true, error}
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.log(error, 'comp did')
    // eslint-disable-next-line no-console
    console.log({error, errorInfo})
    this.setState({errorInfo})
  }
  // A fake logging service 😬

  render() {
    const {hasError} = this.state
    const {children} = this.props
    console.log(hasError)
    if (hasError) return <ErrorFallback />
    return children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any.isRequired,
}

export default ErrorBoundary
