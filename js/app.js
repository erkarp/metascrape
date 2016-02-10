'use strict';

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

React = typeof module !== 'undefined' && module.exports ? require('react/addons') : window.React;

var LinkList = React.createClass({
  displayName: 'LinkList',

  render: function render() {
    var links = this.props.links;
    if (!messages || !messages.length > 0) return React.createElement(
      'p',
      null,
      'No messages yet'
    );
    return React.createElement(
      'table',
      { className: 'table ' },
      React.createElement(
        'caption',
        null,
        'Links'
      ),
      React.createElement(
        'thead',
        null,
        React.createElement(
          'tr',
          null,
          React.createElement(
            'th',
            { className: 'span2' },
            'Slug'
          )
        )
      ),
      React.createElement(
        'tbody',
        null,
        links.map(function (link) {
          return React.createElement(
            'tr',
            { key: link._id },
            React.createElement(
              'td',
              { className: 'span2' },
              link.slug
            )
          );
        })
      )
    );
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    LinkList: LinkList
  };
} else {
  _reactDom2.default.render(React.createElement(LinkList, null), document.getElementById('#wrapper'));
}
