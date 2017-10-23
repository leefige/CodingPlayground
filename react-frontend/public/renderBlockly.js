'use strict';

const editor = React.createElement(ReactBlocklyComponent.BlocklyEditor, {
    workspaceConfiguration: {
      grid: {
        spacing: 20,
        length: 3,
        colour: '#ccc',
        snap: true
      }
    },
    toolboxCategories: [
      {
        name: "动作",
        blocks: [
          { type: "go" },
          { type: "turn_left" },
          { type: "turn_right" },
        ]
      },
      {
        name: "变量",
        blocks: [
          { type: "variables_set" },
          { type: "variables_get" },
        ]
      },
      {
        name: "数学",
        blocks: [
          { type: "math_number" },
          { type: "math_arithmetic",
            values: {
              "A": {
                type: "math_number",
                shadow: true,
                fields: {
                  "NUM": 0
                }
              },
              "B": {
                type: "math_number",
                shadow: true,
                fields: {
                  "NUM": 0
                }
              },
            }
          },
          { type: "math_modulo" ,
            values: {
              "DIVIDEND": {
                type: "math_number",
                shadow: true,
                fields: {
                  "NUM": 3
                }
              },
              "DIVISOR": {
                type: "math_number",
                shadow: true,
                fields: {
                  "NUM": 2
                }
              },
            }
          },
          { type: "math_single" },
          { type: "math_trig" },
          { type: "math_constant" },
          { type: "math_random_int",
              values: {
                "FROM": {
                  type: "math_number",
                  shadow: true,
                  fields: {
                    "NUM": 0
                  }
                },
                "TO": {
                  type: "math_number",
                  shadow: true,
                  fields: {
                    "NUM": 5
                  }
                },
            },
          }
        ]
      },
      {
        name: "分支",
        blocks: [
          { type: "controls_if" },
          { type: "logic_compare" },
        ]
      },
      {
        name: "循环",
        blocks: [
          { type: "controls_whileUntil" },
          { type: "controls_for" ,
            values: {
              "FROM": {
                type: "math_number",
                shadow: true,
                fields: {
                  "NUM": 0
                }
              },
              "TO": {
                type: "math_number",
                shadow: true,
                fields: {
                  "NUM": 5
                }
              },
              "BY": {
                type: "math_number",
                shadow: true,
                fields: {
                  "NUM": 1
                }
              }
            },
          },
        ]
      },
      {
        name: "文本",
        blocks: [
          { type: "text" },
          {
            type: "text_print",
            values: {
              "TEXT": {
                type: "text",
                shadow: true,
                fields: {
                  "TEXT": "abc"
                }
              }
            }
          }
        ]
      }
    ],
    initialXml: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="go" x="5" y="10"></block></xml>',
    wrapperDivClassName: 'fill-height',
    xmlDidChange: function(newXml) {
      // document.getElementById('generated-xml').innerText = newXml;
    }
  }
);

window.addEventListener('load', function() {
  editor,
  ReactDOM.render(editor, document.getElementById('blockly'));
});