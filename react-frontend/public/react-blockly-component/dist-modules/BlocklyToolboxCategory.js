'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _reactImmutableRenderMixin = require('react-immutable-render-mixin');

var _reactImmutableRenderMixin2 = _interopRequireDefault(_reactImmutableRenderMixin);

var _BlocklyToolboxBlock = require('./BlocklyToolboxBlock');

var _BlocklyToolboxBlock2 = _interopRequireDefault(_BlocklyToolboxBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlocklyToolboxCategory = _react2.default.createClass({
  displayName: 'BlocklyToolboxCategory',

  mixins: [_reactImmutableRenderMixin2.default],

  propTypes: {
    name: _react2.default.PropTypes.string,
    custom: _react2.default.PropTypes.string,
    colour: _react2.default.PropTypes.string,
    categories: _reactImmutableProptypes2.default.list,
    blocks: _reactImmutableProptypes2.default.list
  },

  statics: {
    renderCategory: function renderCategory(category, key) {
      if (category.get('type') === 'sep') {
        return _react2.default.createElement('sep', { key: key });
      } else if (category.get('type') === 'search') {
        return _react2.default.createElement('search', { key: key });
      } else {
        return _react2.default.createElement(BlocklyToolboxCategory, {
          name: category.get('name'),
          custom: category.get('custom'),
          colour: category.get('colour'),
          key: key,
          blocks: category.get('blocks'),
          categories: category.get('categories') });
      }
    }
  },

  render: function render() {
    var subcategories = (this.props.categories || []).map(BlocklyToolboxCategory.renderCategory);
    var blocks = (this.props.blocks || []).map(_BlocklyToolboxBlock2.default.renderBlock);

    return _react2.default.createElement(
      'category',
      { is: true, name: this.props.name, custom: this.props.custom, colour: this.props.colour, ref: 'category' },
      blocks,
      subcategories
    );
  }
});

exports.default = BlocklyToolboxCategory;