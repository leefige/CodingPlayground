Blockly = window.Blockly;

Blockly.Blocks.actions = {};
Blockly.Constants.Actions = {};
Blockly.Constants.Actions.HUE = 15;
Blockly.Blocks.actions.HUE = Blockly.Constants.Actions.HUE;
Blockly.defineBlocksWithJsonArray([{
  type: "actions_go",
  message0: "%{BKY_ACTIONS_GO_TITLE}",
  previousStatement: null,
  nextStatement: null,
  colour: "%{BKY_ACTIONS_HUE}",
  tooltip: "",
  helpUrl: ""
}, {
  type: "actions_turn",
  message0: "%1 %{BKY_ACTIONS_TURN_TITLE}",
  args0: [{
    type: "field_dropdown",
    name: "DIRECTION",
    options: [
      ["%{BKY_ACTIONS_TURN_DIRECTION_LEFT}", "LEFT"],
      ["%{BKY_ACTIONS_TURN_DIRECTION_RIGHT}", "RIGHT"]
    ]
  }],
  previousStatement: null,
  nextStatement: null,
  colour: "%{BKY_ACTIONS_HUE}",
  helpUrl: ""
}, ]);