var React = require('react'),
    Link = require('react-router').Link;

var PicShare = React.createClass({
  statics: {
    routeName: 'PicShare'
  },

  getDefaultProps() {
    return {
      routeName: 'PicShare'
    }
  },

  render() {
    return (
      <div block={this.$$block}>
        <Header />
        <main className='main' elem='main'>
          <h1>Picture Share</h1>
        </main>
      </div>
    );
  }
});

module.exports = PicShare;
