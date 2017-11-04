Blockly = window.Blockly;

Blockly.JavaScript.actions = {};

Blockly.JavaScript.actions_go = function () {
    return "goForward();\n"
};

Blockly.JavaScript.actions_turn = function (a) {
    switch (a.getFieldValue("DIRECTION")) {
        case "LEFT":
            return "turnLeft();\n";
        case "RIGHT":
            return "turnRight();\n"
    }
    throw "Undefined direction.";
};