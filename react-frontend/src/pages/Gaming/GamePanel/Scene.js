import React, { Component } from 'react'
import GamePanel from './GamePanel'

class Scene extends Component {

  constructor() {
    super();

    this.state = {
      zoomLevel: 1.0
    };

    this.onZoomIn = this.onZoomIn.bind(this);
    this.onZoomOut = this.onZoomOut.bind(this);
  }

  onZoomIn() {
    let zoomLevel = this.state.zoomLevel += .1;
    this.setState({zoomLevel});
  }

  onZoomOut() {
    let zoomLevel = this.state.zoomLevel -= .1;
    
    if (zoomLevel >= 0)
      this.setState({zoomLevel});
  }

  render() {
    return (
          <div className='scene'>
            <GamePanel zoomLevel={this.state.zoomLevel} mapResource={this.props.mapResource}/>
            {/* <button onClick={this.onZoomIn}>Zoom In</button> */}
            {/* <button onClick={this.onZoomOut}>Zoom Out</button> */}
          </div>
    )
  }
}

export default Scene