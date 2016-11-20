React = (typeof module !== 'undefined' && module.exports) ? require('react') : window.React;

var LinkList = React.createClass({

  render: function()
  {
    var links = this.props.links || []

    return (
      <table>
        <thead><tr><th className="span2">Slug</th></tr></thead>
        <tbody>
          {links.map(function(link)
            {return (
              <tr key={link._id}>
                <td className="span2">{link.url}</td>
              </tr>
            )}
          )}
        </tbody>
      </table>
    )
  }
})

var UrlForm = React.createClass({

  render: function()
  {
    return (
      <form action="links" method="post">
        <input type="url" name="website"/>
        <input onclick="alert(website.hostname)" type="submit"/>
      </form>
    )
  }
})


var Page = React.createClass({

  getInitialState: function(ops)
  {
    var links = this.props.links || []
    return {links: links}
  },

  componentDidMount: function()
  {
    var url = 'http://localhost:3000/messages'
    var _this = this
    /*
    $.getJSON(url, function(result){
      console.log(result)
      if(!result || !result.length){
        return;
      }
      _this.setState({ messages: result });
    });
    */
  },

  render: function()
  {
    return (<main><UrlForm></UrlForm></main>)
  }
})

ReactDOM.render(<Page/>, document.getElementById('main'))
