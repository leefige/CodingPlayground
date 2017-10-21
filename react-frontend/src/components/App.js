import React, { Component } from 'react'
import { CookiesProvider } from 'react-cookie';
import CodeGameApp from './CodeGameApp';

class App extends Component {
  render() {    
    return (
      <CookiesProvider>
        <CodeGameApp />
      </CookiesProvider>
    )
  }
}

export default App
