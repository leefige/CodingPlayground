import React, { Component } from 'react';
import {
  canvasSetup
} from './utils/misc';
import PixiComponent from './utils/pixi';
import { Route, Redirect } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
class MapEditor extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  // componentWillUnmount() {
  //   window.removeEventListener('resize');
  // }

  /**
  * In this case, componentDidMount is used to grab the canvas container ref, and
  * and hook up the PixiJS renderer
  **/
  componentDidMount(props) {
    const { cookies } = this.props;
    const id = cookies.get('id');
    canvasSetup.call(this, this.props.match.params.mapID === undefined);
    new PixiComponent(
      this.stage,
      this.width,
      this.height,
      this.innerWidth,
      this.innerHeight,
      this.renderer,
      this.props.match.params.mapID,
      id
    );
  }

  /**
  * Render our container that will store our PixiJS game canvas. Store the ref
  **/
  render() {
    const { cookies } = this.props;
    console.log(cookies)
    if (cookies.get('isLogin') === "true") {
    return (
      <div
        className="game-canvas-container"
        ref={val => { this.self = val; }}
      >
      </div>
    );
    }
    else {
      return <Redirect push to='/login'/>
    }
  }
}

export default withCookies(MapEditor);
