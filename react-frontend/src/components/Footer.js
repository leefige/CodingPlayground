import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Footer extends Component {
  render() {
    return (
      <div className='row'>
        <nav>
          <span><Link to='251' className="btn btn-outline-primary">Stage 1</Link></span>
          <span><Link to='252' className="btn btn-outline-primary">Stage 2</Link></span>
          <span><Link to='253' className="btn btn-outline-primary">Stage 3</Link></span>
        </nav>
      </div>
    );
  }
}

export default Footer