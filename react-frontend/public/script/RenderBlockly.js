'use strict';

React = window.React;
ReactDOM = window.ReactDOM;
ReactBlocklyComponent = window.ReactBlocklyComponent;

function genBlockly(blocklyConfig) {
  console.log("find blockly", blocklyConfig);
  const editor = React.createElement(ReactBlocklyComponent.BlocklyEditor, {
      media: '../media/',
      workspaceConfiguration: {
        grid: {
          spacing: 20,
          length: 3,
          colour: '#ccc',
          snap: true
        }
      },
      toolboxCategories: blocklyConfig.toolboxCategories,
      initialXml: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="go" x="5" y="10"></block></xml>',
      wrapperDivClassName: 'blockly-workspace',
      xmlDidChange: function(newXml) {
        console.log("user's blockly", newXml);
        const patt = /<block/;
        let tmp = newXml;
        let num = 0;
        let st = tmp.search(patt);
        while (st >= 0) {
          num++;
          tmp = tmp.substring(st + 1, tmp.length - 1);
          console.log("substring", tmp);
          st = tmp.search(patt);
        }
        console.log("num used", num);
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
