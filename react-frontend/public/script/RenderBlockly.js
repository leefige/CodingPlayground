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
      toolboxCategories: blocklyConfig,
      initialXml: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="go" x="5" y="10"></block></xml>',
      wrapperDivClassName: 'blockly-workspace',
      xmlDidChange: function(newXml) {
        // document.getElementById('generated-xml').innerText = newXml;
      }
    }
  );
  ReactDOM.render(editor, document.getElementById('blockly'));
}

window.addEventListener('load', function() {
  const blocklyDiv = document.getElementById('blockly');
  const blocklyConfig = blocklyDiv.dataset.blocklyconfig;
  console.log("find blockly", blocklyConfig);
  genBlockly(blocklyConfig);
});

