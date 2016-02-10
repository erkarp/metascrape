React = (typeof module !== 'undefined' && module.exports) ? require('react/addons') : window.React

var LinkList = React.createClass({
  render: function(){
    var links = this.props.links
    if (!messages || !messages.length>0) return (
        <p>No messages yet</p>
    )
    return (
      <table className="table ">
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
});


import ReactDOM from 'react-dom';
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    LinkList: LinkList
  }
} else {
  ReactDOM.render(<LinkList />, document.getElementById('#wrapper'))
}
