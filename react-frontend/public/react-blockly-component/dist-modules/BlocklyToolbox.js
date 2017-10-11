'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _BlocklyToolboxCategory = require('./BlocklyToolboxCategory');

var _BlocklyToolboxCategory2 = _interopRequireDefault(_BlocklyToolboxCategory);

var _BlocklyToolboxBlock = require('./BlocklyToolboxBlock');

var _BlocklyToolboxBlock2 = _interopRequireDefault(_BlocklyToolboxBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlocklyToolbox = _react2.default.createClass({
  displayName: 'BlocklyToolbox',

  propTypes: {
    categories: _reactImmutableProptypes2.default.list,
    blocks: _reactImmutableProptypes2.default.list,
    processCategory: _react2.default.PropTypes.func,
    didUpdate: _react2.default.PropTypes.func
  },

  renderCategories: function renderCategories(categories) {
    return categories.map(function (category, i) {
      if (category.get('type') === 'sep') {
        return _react2.default.createElement('sep', { key: "sep_" + i });
      } else if (category.get('type') === 'search') {
        return _react2.default.createElement('search', { key: "search_" + i });
      } else {
        return _react2.default.createElement(_BlocklyToolboxCategory2.default, {
          name: category.get('name'),
          custom: category.get('custom'),
          colour: category.get('colour'),
          key: "category_" + category.get('name') + "_" + i,
          blocks: category.get('blocks'),
          categories: category.get('categories') });
      }
    }.bind(this));
  },

  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    return !((0, _immutable.is)(nextProps.categories, this.props.categories) && (0, _immutable.is)(nextProps.blocks, this.props.blocks));
  },

  componentDidMount: function componentDidMount() {
    this.props.didUpdate();
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    this.props.didUpdate();
  },

  processCategory: function processCategory(category) {
    var processedCategory = category;

    if (processedCategory.has('categories')) {
      processedCategory = category.update('categories', function (subcategories) {
        return subcategories.map(this.processCategory);
      }.bind(this));
    }

    if (this.props.processCategory) {
      return this.props.processCategory(processedCategory);
    }

    return processedCategory;
  },

  render: function render() {
    if (this.props.categories) {
      return _react2.default.createElement(
        'xml',
        { style: { display: "none" } },
        this.renderCategories(this.props.categories.map(this.processCategory))
      );
    } else {
      return _react2.default.createElement(
        'xml',
        { style: { display: "none" } },
        this.props.blocks.map(_BlocklyToolboxBlock2.default.renderBlock)
      );
    }
  }
});

exports.default = BlocklyToolbox;