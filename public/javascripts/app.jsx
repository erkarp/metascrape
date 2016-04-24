React = (typeof module !== 'undefined' && module.exports) ? require('react/addons') : window.React

var LinkList = React.createClass({
  render: function() {
    var links = this.props.links || []

    return (
      <table>
        <caption>Links</caption>
        <thead>
          <tr>
            <th className="span2">Slug</th>
          </tr>
        </thead>
        <tbody>
          {links.map(function(link){
            return (
              <tr key={link._id}>
                <td className="span2">{link.slug}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
})

var UrlForm = React.createClass({
  render: function() {
    return (
      <form action="links" method="post">
        <input type="url" name="website"/>
        <input onclick="alert(website.hostname)" type="submit"/>
      </form>
    )
  }
})

var Page = React.createClass({
  getInitialState: function(ops){
    var links = this.props.links || []
    return {links: links}
  },
  componentDidMount: function(){
    var url = 'http://localhost:3000/messages'
    var _this = this
    $.getJSON(url, function(result){
      console.log(result)
      if(!result || !result.length){
        return;
      }
      _this.setState({ messages: result });
    });
  },

  render: function() {
    console.log(this.props.links)
    return (
      <main>
        <UrlForm></UrlForm>
        <LinkList list={this.props.links}></LinkList>
      </main>
    )
  }
})

ReactDOM.render(<Page/>, document.getElementById('main'))
