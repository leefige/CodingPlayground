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
}, {
  type: "actions_attack",
  message0: "%{BKY_ACTIONS_ATTACK_TITLE}",
  previousStatement: null,
  nextStatement: null,
  colour: "%{BKY_ACTIONS_HUE}",
  tooltip: "",
  helpUrl: ""
}, {
  type: "actions_open_chest",
  message0: "%{BKY_ACTIONS_OPEN_CHEST_TITLE}",
  previousStatement: null,
  nextStatement: null,
  colour: "%{BKY_ACTIONS_HUE}",
  tooltip: "",
  helpUrl: ""
}, {
  type: "actions_use",
  message0: "%{BKY_ACTIONS_USE_TITLE} %1",
  args0: [
    {
      "type": "input_value",
      "name": "OBJECT",
      "check": "Object"
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: "%{BKY_ACTIONS_HUE}",
  tooltip: "",
  helpUrl: ""
},
]);

Blockly.Blocks.objects = {};
Blockly.Constants.Objects = {};
Blockly.Constants.Objects.HUE = 45;
Blockly.Blocks.objects.HUE = Blockly.Constants.Objects.HUE;
Blockly.defineBlocksWithJsonArray([{
  type: "objects_torch",
  message0: "%{BKY_OBJECTS_TORCH_TITLE}",
  output: "Object",
  colour: "%{BKY_OBJECTS_HUE}",
  tooltip: "",
  helpUrl: ""
}, {
  type: "objects_bomb",
  message0: "%{BKY_OBJECTS_BOMB_TITLE}",
  output: "Object",
  colour: "%{BKY_OBJECTS_HUE}",
  tooltip: "",
  helpUrl: ""
}]);

Blockly.defineBlocksWithJsonArray([{
  type: "logic_in_front_of",
  message0: "%{BKY_LOGIC_IN_FRONT_OF_TITLE} %1",
  args0: [{
    type: "field_dropdown",
    name: "OBJECT",
    options: [
      ["%{BKY_LOGIC_IN_FRONT_OF_CHEST}", "CHEST"],
      ["%{BKY_LOGIC_IN_FRONT_OF_ENEMY}", "ENEMY"],
      ["%{BKY_LOGIC_IN_FRONT_OF_GRASS}", "GRASS"],
      ["%{BKY_LOGIC_IN_FRONT_OF_TREE}", "TREE"],
      ["%{BKY_LOGIC_IN_FRONT_OF_FENCE}", "FENCE"],
      ["%{BKY_LOGIC_IN_FRONT_OF_STONE}", "STONE"],
      ["%{BKY_LOGIC_IN_FRONT_OF_CLIFF}", "CLIFF"],
      ["%{BKY_LOGIC_IN_FRONT_OF_POND}", "POND"],
    ]
  }],
  output: "Boolean",
  colour: "%{BKY_LOGIC_HUE}",
  tooltip: "",
  helpUrl: ""
}]);