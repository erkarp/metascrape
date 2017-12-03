var Link = React.createClass({

  render: function() {
    return (
      <tr>
        <td className="span2">{this.prop.url}</td>
      </tr>
  )}
})

var LinkList = React.createClass({

  getInitialState: function()
  {
    var links = this.props.links || [];
    return {links: links};
  },

  render: function()
  {
    var links = this.props.links || [];

    return (
      <table>
        <thead>
          <tr><th className="span2">Slug</th></tr>
        </thead>

        <tbody>
          {links.map(function(link)
            {
              return (<Link key={link._id} url={link.url}></Link>)
            }
          )}
        </tbody>
      </table>
    )
  }
})

var links = render(<LinkList/>, document.getElementById('links'));