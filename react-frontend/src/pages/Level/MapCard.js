import React, { Component } from 'react';

class MapCard extends Component {
  render() {
    return (
      <div className='col-md-3'>
        <div className="card-content">
          <div className="row">
            <div className="col-lg-12">
              <img className="minimap" src={"/img/mini_map/" + this.props.levelNumber + ".png"} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-lg-offset-3">
              <div className="level-title">
                <h4>- 第 <span> {this.props.levelNumber} </span> 关 -</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default MapCard;
