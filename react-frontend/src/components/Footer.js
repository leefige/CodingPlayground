import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Footer extends Component {
  render() {
    return (
      <div className='row'>
        <div class="btn-group" role="group" aria-label="...">
            <button type="button" class="btn btn-default"><Link to='275'>1</Link></button>
            <button type="button" class="btn btn-default"><Link to='276'>2</Link></button>
            <button type="button" class="btn btn-default"><Link to='274'>3</Link></button>
        </div>
      </div>
    );
  }
}

export default Footer