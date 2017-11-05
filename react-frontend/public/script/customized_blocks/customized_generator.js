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

Blockly.JavaScript.actions_attack = function () {
    return "attack();\n"
};

Blockly.JavaScript.actions_use = function (a) {
    return "use(" + Blockly.JavaScript.valueToCode(a, 'OBJECT', Blockly.JavaScript.ORDER_NONE) + ");\n";
};

Blockly.JavaScript.objects_torch = function () {
    return ["'torch'", Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript.objects_bomb = function () {
    return ["'bomb'", Blockly.JavaScript.ORDER_NONE];
};