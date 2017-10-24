'use strict';

ReactBlocklyComponent = window.ReactBlocklyComponent;
React = window.React;
ReactDOM = window.ReactDOM;

function configCategory(categoryConfigJSON) {
  return eval( '(' + categoryConfigJSON + ')' );
}

/* -------------------------------------------------------- */

window.addEventListener('load', function() {
  // console.log("find blockly", document.getElementById('blockly').dataset.blockconfig);
  const blocklyDiv = document.getElementById('blockly');
  const blockConfigJSON = blocklyDiv.dataset.blockconfig;
  const editor = React.createElement(ReactBlocklyComponent.BlocklyEditor, {
    workspaceConfiguration: {
      grid: {
        spacing: 20,
        length: 3,
        colour: '#ccc',
        snap: true
      }
    },
    toolboxCategories: configCategory(blockConfigJSON),
    initialXml: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="go" x="5" y="10"></block></xml>',
    wrapperDivClassName: 'fill-height',
    xmlDidChange: function(newXml) {
      // document.getElementById('generated-xml').innerText = newXml;
    }
  }
);
  ReactDOM.render(editor, document.getElementById('blockly'));
});