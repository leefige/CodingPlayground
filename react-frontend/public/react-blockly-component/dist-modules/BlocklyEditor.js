'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _BlocklyToolbox = require('./BlocklyToolbox');

var _BlocklyToolbox2 = _interopRequireDefault(_BlocklyToolbox);

var _BlocklyWorkspace = require('./BlocklyWorkspace');

var _BlocklyWorkspace2 = _interopRequireDefault(_BlocklyWorkspace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlocklyEditor = _react2.default.createClass({
  displayName: 'BlocklyEditor',

  propTypes: {
    initialXml: _react2.default.PropTypes.string,
    workspaceConfiguration: _react2.default.PropTypes.object,
    wrapperDivClassName: _react2.default.PropTypes.string,
    toolboxCategories: _react2.default.PropTypes.array,
    toolboxBlocks: _react2.default.PropTypes.array,
    xmlDidChange: _react2.default.PropTypes.func,
    onImportXmlError: _react2.default.PropTypes.func,
    processToolboxCategory: _react2.default.PropTypes.func
  },

  toolboxDidUpdate: function toolboxDidUpdate() {
    var workspaceConfiguration = this.props.workspaceConfiguration || {};
    if (this.refs.workspace && !workspaceConfiguration.readOnly) {
      this.refs.workspace.toolboxDidUpdate(_reactDom2.default.findDOMNode(this.refs.toolbox));
    }
  },

  componentDidMount: function componentDidMount() {
    this.toolboxDidUpdate();
  },

  xmlDidChange: function xmlDidChange(newXml) {
    if (this.props.xmlDidChange) {
      this.props.xmlDidChange(newXml);
    }
  },

  importFromXml: function importFromXml(xml) {
    return this.refs.workspace.importFromXml(xml);
  },

  resize: function resize() {
    this.refs.workspace.resize();
  },

  render: function render() {
    var toolboxMode;
    if (this.props.toolboxCategories) {
      toolboxMode = "CATEGORIES";
    } else if (this.props.toolboxBlocks) {
      toolboxMode = "BLOCKS";
    }

    return _react2.default.createElement(
      'div',
      { className: this.props.wrapperDivClassName },
      _react2.default.createElement(_BlocklyToolbox2.default, {
        categories: _immutable2.default.fromJS(this.props.toolboxCategories),
        blocks: _immutable2.default.fromJS(this.props.toolboxBlocks),
        didUpdate: this.toolboxDidUpdate,
        processCategory: this.props.processToolboxCategory,
        ref: 'toolbox' }),
      _react2.default.createElement(_BlocklyWorkspace2.default, { ref: 'workspace',
        initialXml: this.props.initialXml,
        onImportXmlError: this.props.onImportXmlError,
        toolboxMode: toolboxMode,
        xmlDidChange: this.xmlDidChange,
        wrapperDivClassName: this.props.wrapperDivClassName,
        workspaceConfiguration: this.props.workspaceConfiguration })
    );
  }
});

exports.default = BlocklyEditor;