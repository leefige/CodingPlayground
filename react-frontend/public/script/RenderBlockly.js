'use strict';

React = window.React;
ReactDOM = window.ReactDOM;
ReactBlocklyComponent = window.ReactBlocklyComponent;

function genBlockly(blocklyConfig) {
  // console.log("blockly config", blocklyConfig);
  const editor = React.createElement(ReactBlocklyComponent.BlocklyEditor, {
      media: '../media/',
      workspaceConfiguration: {
        grid: {
          spacing: 40,
          length: 3,
          colour: '#ccc',
          snap: false
        }
      },
      toolboxCategories: blocklyConfig.toolboxCategories,
      initialXml: blocklyConfig.initialXml,
      wrapperDivClassName: 'blockly-workspace',
      xmlDidChange: function(newXml) {
        document.getElementById('solution_text').value=newXml;
        const patt = /<block/;
        let tmp = newXml;
        let num = 0;
        let st = tmp.search(patt);
        while (st >= 0) {
          num++;
          tmp = tmp.substring(st + 1, tmp.length - 1);
          st = tmp.search(patt);
        }
        document.getElementById('show_count').innerHTML="您已使用" + num + "块";
        document.getElementById('solution_cnt').value=num;
      }
    }
  );
  ReactDOM.render(editor, document.getElementById('blockly'));
}

// window.addEventListener('load', function() {
//   const blocklyDiv = document.getElementById('blockly');
//   const blocklyConfig = blocklyDiv.dataset.blocklyconfig;
//   console.log("find blockly", blocklyConfig);
//   genBlockly(blocklyConfig);
// });
