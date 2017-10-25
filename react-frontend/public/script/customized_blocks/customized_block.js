Blockly = window.Blockly;

Blockly.Blocks.actions = {};
Blockly.Constants.Actions = {};
Blockly.Constants.Actions.HUE = 15;
Blockly.Blocks.actions.HUE = Blockly.Constants.Actions.HUE;
Blockly.defineBlocksWithJsonArray([{
  type: "go",
  message0: "%{BKY_ACTIONS_GO_TITLE}",
  previousStatement: null,
  nextStatement: null,
  colour: "%{BKY_ACTIONS_HUE}",
  tooltip: "",
  helpUrl: ""
},
{
  type: "turn_left",
  message0: "%{BKY_ACTIONS_TURN_LEFT_TITLE}",
  previousStatement: null,
  nextStatement: null,
  colour: "%{BKY_ACTIONS_HUE}",
  tooltip: "",
  helpUrl: ""
},
{
  type: "turn_right",
  message0: "%{BKY_ACTIONS_TURN_RIGHT_TITLE}",
  previousStatement: null,
  nextStatement: null,
  colour: "%{BKY_ACTIONS_HUE}",
  tooltip: "",
  helpUrl: ""
}]);