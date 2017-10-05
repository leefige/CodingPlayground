import React, { Component } from 'react'

class BlocklyPad extends Component {
    render() {
        var blocklyArea = document.getElementById('blocklyArea');
        var blocklyDiv = document.getElementById('blocklyDiv');
        var workspace = Blockly.inject(blocklyDiv,
            {media: '../../media/',
            toolbox: document.getElementById('toolbox')});
        var onresize = function(e) {
        // Compute the absolute coordinates and dimensions of blocklyArea.
        var element = blocklyArea;
        var x = 0;
        var y = 0;
        do {
            x += element.offsetLeft;
            y += element.offsetTop;
            element = element.offsetParent;
        } while (element);
        // Position blocklyDiv over blocklyArea.
        blocklyDiv.style.left = x + 'px';
        blocklyDiv.style.top = y + 'px';
        blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
        blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
        };
        window.addEventListener('resize', onresize, false);
        onresize();
        Blockly.svgResize(workspace);
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

                <div id="blocklyDiv">
                <xml id="toolbox" style="display: none">
                        <block type="controls_if"></block>
                        <block type="logic_compare"></block>
                        <block type="controls_repeat_ext"></block>
                        <block type="math_number"></block>
                        <block type="math_arithmetic"></block>
                        <block type="text"></block>
                        <block type="text_print"></block>
                    </xml>


                    <div class="blocklyWidgetDiv"></div>
                    <div class="blocklyTooltipDiv"></div>

                </div>
            </div>
        )
    }
}

export default BlocklyPad