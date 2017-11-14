import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { post } from "../../utils/Request";
import MapCard from "./MapCard";

class Level extends Component {
  render() {
    return (
      <div className='col-md-8 col-md-offset-2'>
        <MapCard levelNumber="1"/>
        <MapCard levelNumber="2"/>
        <MapCard levelNumber="3"/>
        <MapCard levelNumber="4"/>

      </div>

    );
  }
}

export default Level;
