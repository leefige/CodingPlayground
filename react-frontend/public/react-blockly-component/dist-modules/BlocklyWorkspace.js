'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debounce = function debounce(func, wait) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;
    var later = function later() {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

var BlocklyWorkspace = _react2.default.createClass({
  displayName: 'BlocklyWorkspace',

  propTypes: {
    initialXml: _react2.default.PropTypes.string,
    workspaceConfiguration: _react2.default.PropTypes.object,
    wrapperDivClassName: _react2.default.PropTypes.string,
    xmlDidChange: _react2.default.PropTypes.func,
    onImportXmlError: _react2.default.PropTypes.func,
    toolboxMode: _react2.default.PropTypes.oneOf(['CATEGORIES', 'BLOCKS'])
  },

  getInitialState: function getInitialState() {
    return {
      workspace: null,
      xml: this.props.initialXml
    };
  },

  componentDidMount: function componentDidMount() {
    // TODO figure out how to use setState here without breaking the toolbox when switching tabs
    this.state.workspace = Blockly.inject(this.refs.editorDiv, _extends({}, this.props.workspaceConfiguration || {}, {
      toolbox: _reactDom2.default.findDOMNode(this.refs.dummyToolbox)
    }));

    if (this.state.xml) {
      if (this.importFromXml(this.state.xml)) {
        this.xmlDidChange();
      } else {
        this.setState({ xml: null }, this.xmlDidChange);
      }
    }

    this.state.workspace.addChangeListener(debounce(function () {
      var newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.state.workspace));
      if (newXml == this.state.xml) {
        return;
      }

      this.setState({ xml: newXml }, this.xmlDidChange);
    }.bind(this), 200));
  },

  importFromXml: function importFromXml(xml) {
    try {
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), this.state.workspace);
      return true;
    } catch (e) {
      if (this.props.onImportXmlError) {
        this.props.onImportXmlError(e);
      }
      return false;
    }
  },

  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    if (this.props.initialXml != newProps.initialXml) {
      this.setState({ xml: newProps.initialXml });
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    if (this.state.workspace) {
      this.state.workspace.dispose();
    }
  },

  shouldComponentUpdate: function shouldComponentUpdate() {
    return false;
  },

  xmlDidChange: function xmlDidChange() {
    if (this.props.xmlDidChange) {
      this.props.xmlDidChange(this.state.xml);
    }
  },

  toolboxDidUpdate: function toolboxDidUpdate(toolboxNode) {
    if (toolboxNode && this.state.workspace) {
      this.state.workspace.updateToolbox(toolboxNode);
    }
  },

  resize: function resize() {
    Blockly.svgResize(this.state.workspace);
  },

  render: function render() {
    // We have to fool Blockly into setting up a toolbox with categories initially;
    // otherwise it will refuse to do so after we inject the real categories into it.
    var dummyToolboxContent;
    if (this.props.toolboxMode === "CATEGORIES") {
      dummyToolboxContent = _react2.default.createElement('category', { name: 'Dummy toolbox' });
    }

    return _react2.default.createElement(
      'div',
      { className: this.props.wrapperDivClassName },
      _react2.default.createElement(
        'xml',
        { style: { display: "none" }, ref: 'dummyToolbox' },
        dummyToolboxContent
      ),
      _react2.default.createElement('div', { ref: 'editorDiv', className: this.props.wrapperDivClassName })
    );
  }
});

exports.default = BlocklyWorkspace;