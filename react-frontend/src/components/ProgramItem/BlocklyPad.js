import React, { Component } from 'react'

class BlocklyPad extends Component {
    blockly_ac_comp() {
        "../../../node_modules/blockly/blockly_accessible_compressed.js";
    }

    blocks_comp() {
        "../../../node_modules/blockly/blocks_compressed.js";
    }

    blockly_comp() {
        "../../../node_modules/blockly/blockly_compressed.js";
    }

    msg() {
        "../../../node_modules/blockly/msg/js/zh-hans.js";
    }

    analytics() {
        "./analytics.js";
    }

    func() {
        var blocklyArea = document.getElementById('blocklyArea');
        var blocklyDiv = document.getElementById('blocklyDiv');
        var workspace = window.Blockly.inject(blocklyDiv,
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
        Window.Blockly.svgResize(workspace);
    }

    createMarkup() { 
        return {__html: 
            '<script src="../../../node_modules/blockly/blocks_compressed.js"></script><script src="../../../node_modules/blockly/blocks_compressed.js"></script><script src="../../../node_modules/blockly/blockly_compressed.js"></script><script src="../../../node_modules/blockly/msg/js/zh-hans.js"></script><div id="blocklyDiv" style="height: 480px; width: 600px;"></div><xml id="toolbox" style="display: none"><block type="controls_if"></block><block type="logic_compare"></block><block type="controls_repeat_ext"></block><block type="math_number"></block><block type="math_arithmetic"></block><block type="text"></block><block type="text_print"></block></xml><script>var demoWorkspace = Blockly.inject(\'blocklyDiv\',{media: \'..\/..\/media\/\',toolbox: document.getElementById(\'toolbox\')});</script>'
        }; 
    };
    


    render() {
        return (
            <div dangerouslySetInnerHTML={this.createMarkup()} />
            // <div className='blockly_pad'>

            //     
        
        
            //     <table>
            //     <tbody>
            //     <tr>
            //         <td id="blocklyArea">
            //         </td>
            //     </tr>
            //     </tbody></table>
            
            //     <div id="blocklyDiv">
            //         <div class="injectionDiv" dir="LTR"></div>
            //     </div>

            //     <xml id="toolbox">
            //     <block type="controls_if"></block>
            //     <block type="logic_compare"></block>
            //     <block type="controls_repeat_ext"></block>
            //     <block type="math_number"></block>
            //     <block type="math_arithmetic"></block>
            //     <block type="text"></block>
            //     <block type="text_print"></block>
            //     </xml>
            
            //     {this.func()}
            //     <div class="blocklyWidgetDiv"></div><div class="blocklyTooltipDiv"></div>
            // </div>
        )
    }
}

export default BlocklyPad

