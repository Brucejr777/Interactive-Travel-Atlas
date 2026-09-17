import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Replace with real telemetry in production.
    console.error('Uncaught error in Interactive Travel Atlas:', error, info.componentStack)
  }

  handleReset = () => this.setState({ error: null })

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.error) {
      return (
        <div className="container">
          <div className="empty">
            <h2>Something went wrong</h2>
            <p>{this.state.error.message}</p>
            <p
              style={{
                marginTop: 16,
                display: 'flex',
                gap: 12,
                justifyContent: 'center',
              }}
            >
              <button className="btn btn--primary" onClick={this.handleReset}>
                Try again
              </button>
              <button className="btn btn--ghost" onClick={this.handleReload}>
                Reload page
              </button>
            </p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}