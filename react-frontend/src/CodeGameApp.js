import React, { Component } from 'react'
import LoginHeader from './LoginHeader'
import CodeGameContent from './CodeGameContent'
import Footer from './Footer'

class CodeGameApp extends Component {
  render() {    
    return (
      <div>
        <LoginHeader />
        <CodeGameContent />
        <Footer />
      </div>
    )
  }
}

export default CodeGameApp
