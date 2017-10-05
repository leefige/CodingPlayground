import React, { Component } from 'react'
import Scene from './Scene'
import Programing from './Programing'

class CodeGameContent extends Component {
    render() {
        return (
            <div className='code-game-content'>
                <Scene />
                <Programing /> 
            </div>
        )
    }
}

export default CodeGameContent