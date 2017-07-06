import React, { Component } from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import store from './redux/store'

class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('root'))
registerServiceWorker()
