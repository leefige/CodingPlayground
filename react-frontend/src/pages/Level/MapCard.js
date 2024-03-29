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
      level: parseInt(this.props.levelNumber, 10),
    })
  }

  handleClick() {
    if (this.getIsLocked()) {
      return;
    }
    if (this.state.level <= 10 || this.state.level === 100) {
      this.props.onSelectLevel(this.state.level);
    }
    else {
      return;
    }
  }

  getIsLocked() {
    return this.props.lock(this.state.level);
  }

  render() {
    return (
      <div className='col-md-3 col-sm-3' onClick={this.handleClick.bind(this)}>
        <div className="card-content">
          <div className="row">
            <div className="col-lg-12">
              {this.state.level > 0 ? (
                this.state.level <= 10 ? (
                  this.getIsLocked() ?
                      <img className="minimap" alt="待解锁" src={"/img/mini_map/lock.jpg"} /> :
                      <img className="minimap" alt={"第" + this.props.levelNumber + "关"} src={"/img/mini_map/" + this.props.levelNumber + ".png"} /> ) :
                    <img className="minimap" alt="地图大厅" src={"/img/mini_map/playground.jpg"} />
                ) :
                <img className="minimap" alt="地图编辑器" src={"/img/mini_map/edit.png"} />
              }
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="level-title">
                {this.state.level > 0 ? (
                  this.state.level <= 10 ?
                    <h4>- 第 <span> {this.props.levelNumber} </span> 关 -</h4> :
                    <h4>- 地图大厅 -</h4>
                  ) :
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
