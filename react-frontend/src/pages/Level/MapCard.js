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
    if (this.state.level <= 10) {
      this.props.onSelectLevel(this.state.level);
    }
    else {
      return;
    }
  }

  render() {
    return (
      <div className='col-md-3' onClick={this.handleClick.bind(this)}>
        <div className="card-content">
          <div className="row">
            <div className="col-lg-12">
              {this.state.level > 0 ? (
                this.state.level <= 10 ?
                    <img className="minimap" alt={"第" + this.props.levelNumber + "关"} src={"/img/mini_map/" + this.props.levelNumber + ".png"} /> :
                    <img className="minimap" alt="敬请期待" src={"/img/mini_map/lock.jpg"} />
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
                    <h4>- 敬请期待 -</h4>
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
