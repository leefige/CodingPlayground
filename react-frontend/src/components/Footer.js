import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Footer extends Component {
  render() {
    return (
      <div className='col-md-offset-6'>
        <div class="btn-group" role="group" aria-label="...">
          <Link to='275' type="button" class="btn btn-default">1</Link>
          <Link to='276' type="button" class="btn btn-default">2</Link>
          <Link to='274' type="button" class="btn btn-default">3</Link>
        </div>
      </div>
    );
  }
}

export default Footer