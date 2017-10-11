'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _reactImmutableRenderMixin = require('react-immutable-render-mixin');

var _reactImmutableRenderMixin2 = _interopRequireDefault(_reactImmutableRenderMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlocklyToolboxBlock = _react2.default.createClass({
  displayName: 'BlocklyToolboxBlock',

  mixins: [_reactImmutableRenderMixin2.default],

  propTypes: {
    type: _react2.default.PropTypes.string.isRequired,
    shadow: _react2.default.PropTypes.bool,
    fields: _reactImmutableProptypes2.default.map,
    values: _reactImmutableProptypes2.default.map,
    statements: _reactImmutableProptypes2.default.map,
    next: _reactImmutableProptypes2.default.map,
    mutation: _reactImmutableProptypes2.default.mapContains({
      attributes: _reactImmutableProptypes2.default.map,
      innerContent: _react2.default.PropTypes.string
    })
  },

  statics: {
    renderBlock: function renderBlock(block, key) {
      return _react2.default.createElement(BlocklyToolboxBlock, {
        type: block.get('type'),
        key: key,
        fields: block.get('fields'),
        values: block.get('values'),
        statements: block.get('statements'),
        mutation: block.get('mutation'),
        shadow: block.get('shadow'),
        next: block.get('next') });
    }
  },

  componentDidMount: function componentDidMount() {
    if (this.props.mutation) {
      var mutation = _reactDom2.default.findDOMNode(this.refs.mutation);

      this.props.mutation.get('attributes').forEach(function (value, attributeName) {
        mutation.setAttribute(attributeName, value);
        return true;
      });
    }
  },

  render: function render() {
    var fields = [];
    var values = [];
    var statements = [];
    var mutation = null;
    var nextBlock = null;

    if (this.props.fields) {
      fields = this.props.fields.map(function (fieldValue, fieldName, i) {
        return _react2.default.createElement(
          'field',
          { name: fieldName, key: "field_" + fieldName + "_" + i },
          fieldValue
        );
      }.bind(this)).valueSeq();
    }

    if (this.props.values) {
      values = this.props.values.map(function (valueBlock, valueName, i) {
        return _react2.default.createElement(
          'value',
          { name: valueName, key: "value_" + valueName + "_" + i },
          BlocklyToolboxBlock.renderBlock(valueBlock)
        );
      }.bind(this)).valueSeq();
    }

    if (this.props.statements) {
      statements = this.props.statements.map(function (statementBlock, statementName, i) {
        return _react2.default.createElement(
          'statement',
          { name: statementName, key: "statement_" + statementName + "_" + i },
          BlocklyToolboxBlock.renderBlock(statementBlock)
        );
      }.bind(this)).valueSeq();
    }

    if (this.props.mutation) {
      mutation = _react2.default.createElement('mutation', { dangerouslySetInnerHTML: { __html: this.props.mutation.get('innerContent') }, ref: 'mutation' });
    }

    if (this.props.next) {
      nextBlock = _react2.default.createElement(
        'next',
        null,
        BlocklyToolboxBlock.renderBlock(this.props.next)
      );
    }

    if (this.props.shadow) {
      return _react2.default.createElement(
        'shadow',
        { type: this.props.type },
        mutation,
        fields,
        values,
        statements,
        nextBlock
      );
    } else {
      return _react2.default.createElement(
        'block',
        { type: this.props.type },
        mutation,
        fields,
        values,
        statements,
        nextBlock
      );
    }
  }
});

exports.default = BlocklyToolboxBlock;