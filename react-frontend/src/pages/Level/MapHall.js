import React, { Component } from 'react';
import { post } from "../../utils/Request";
import { Link } from 'react-router-dom';

class ListItem extends Component {
  render () {
    const { item } = this.props;
    return (
      <div className="row">
        <div className="col-lg-3">
          <Link to={"/map/" + item.url}>{item.name}</Link>
        </div>
        <div className="col-lg-3">
          {item.editor}
        </div>
        <div className="col-lg-3">
          {item.time}
        </div>
        <div className="col-lg-3">
        <Link type="button" to={"/mapEditor/" + item.url}>编辑地图</Link>
        </div>
        <hr />
      </div>
    );
  }
}

class MapHall extends Component {
  constructor() {
    super();
    this.state = {
      mapList: [{url: "305", name: "另一张地图",  editor: "also mym", time:"2017/11/20"}, {url: "301", name: "一张地图", editor: "mym", time:"2017/11/15"}, ],
    };
  }

  componentWillMount() {
    // 获取所有用户自定义地图列表
    post('/api/v1/mapEditor/getAll', {
      userId: this.props.getLoginUserId,
		})
    .then((responseJson) => {
      this.setState({
        mapList: responseJson.mapList || [{url: "301", name: "一张地图", editor: "mym", time:"2017/11/15"}, {url: "305", name: "另一张地图",  editor: "also mym", time:"2017/11/20"}],
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <div className='col-md-8 col-md-offset-2'>
        <div className="tab-content">
          <div class="tab-pane active" id="about">
            <h3>地图大厅</h3>
            <h5>Map Hall</h5>
          </div>
          <hr/>
          <div className="row">
            <div className="col-lg-3"><h5>地图名称</h5></div>
            <div className="col-lg-3"><h5>作者</h5></div>
            <div className="col-lg-3"><h5>创建时间</h5></div>
          </div>
          <hr/>
          <div>
            {this.state.mapList.map((item) => <ListItem item={item} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default MapHall;
