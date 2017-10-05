import React, { Component } from 'react'

class BlocklyPad extends Component {
    render() {
        return (
            <div className='blockly_pad'>
                <table>
                    <tbody>
                    <tr>
                        <td id="blocklyArea" className='blocklyArea'>
                        Blockly will be positioned here.
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default BlocklyPad