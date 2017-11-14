import React, { Component } from 'react';

class MapCard extends Component {

  constructor() {
    super();
    this.state = {
      level: 0,
    }
  }

  componentWillMount() {
    this.setState({
      level: parseInt(this.props.levelNumber),
    })
  }

  handleClick() {
    this.props.onSelectLevel(this.state.level);
  }

  render() {
    return (
      <div className='col-md-3' onClick={this.handleClick.bind(this)}>
        <div className="card-content">
          <div className="row">
            <div className="col-lg-12">
              {this.state.level > 0 && this.state.level < 5 ?
                <img className="minimap" src={"/img/mini_map/" + this.props.levelNumber + ".png"} /> :
                this.state.level < 0 ?
                  <img className="minimap" src={"/img/mini_map/edit.png"} /> :
                  <img className="minimap" src={"/img/mini_map/lock.jpg"} />
              }
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="level-title">
                {this.state.level > 0 ?
                  <h4>- 第 <span> {this.props.levelNumber} </span> 关 -</h4> :
                  <h4>- 地图编辑器 -</h4>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MapCard;
