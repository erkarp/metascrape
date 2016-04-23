React = typeof module !== 'undefined' && module.exports ? require('react/addons') : window.React;

var LinkList = React.createClass({
  displayName: 'LinkList',

  render: function () {
    var links = this.props.links || [];

    return React.createElement(
      'table',
      null,
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

var UrlForm = React.createClass({
  displayName: 'UrlForm',

  render: function () {
    return React.createElement(
      'form',
      { action: 'links', method: 'post' },
      React.createElement('input', { type: 'text', name: 'url' }),
      React.createElement('input', { type: 'submit' })
    );
  }
});

var Page = React.createClass({
  displayName: 'Page',

  getInitialState: function (ops) {
    var links = this.props.links || [];
    return { links: links };
  },
  componentDidMount: function () {
    var url = 'http://localhost:3000/messages';
    var _this = this;
    $.getJSON(url, function (result) {
      console.log(result);
      if (!result || !result.length) {
        return;
      }
      _this.setState({ messages: result });
    });
  },

  render: function () {
    console.log(this.props.links);
    return React.createElement(
      'main',
      null,
      React.createElement(UrlForm, null),
      React.createElement(LinkList, { list: this.props.links })
    );
  }
});

ReactDOM.render(React.createElement(Page, null), document.getElementById('main'));
//# sourceMappingURL=app.js.map
