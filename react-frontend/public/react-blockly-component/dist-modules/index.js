'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BlocklyEditor = require('./BlocklyEditor');

var _BlocklyEditor2 = _interopRequireDefault(_BlocklyEditor);

var _BlocklyToolbox = require('./BlocklyToolbox');

var _BlocklyToolbox2 = _interopRequireDefault(_BlocklyToolbox);

var _BlocklyToolboxBlock = require('./BlocklyToolboxBlock');

var _BlocklyToolboxBlock2 = _interopRequireDefault(_BlocklyToolboxBlock);

var _BlocklyToolboxCategory = require('./BlocklyToolboxCategory');

var _BlocklyToolboxCategory2 = _interopRequireDefault(_BlocklyToolboxCategory);

var _BlocklyWorkspace = require('./BlocklyWorkspace');

var _BlocklyWorkspace2 = _interopRequireDefault(_BlocklyWorkspace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactBlocklyComponent = {
  BlocklyEditor: _BlocklyEditor2.default,
  BlocklyToolbox: _BlocklyToolbox2.default,
  BlocklyToolboxBlock: _BlocklyToolboxBlock2.default,
  BlocklyToolboxCategory: _BlocklyToolboxCategory2.default,
  BlocklyWorkspace: _BlocklyWorkspace2.default
};

module.exports = ReactBlocklyComponent;

exports.default = ReactBlocklyComponent;