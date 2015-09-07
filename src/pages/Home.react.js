var React = require('react'),
    Header = require('../components/Header.react'),
    Link = require('react-router').Link;

var Home = React.createClass({
  statics: {
    routeName: 'Home'
  },

  getDefaultProps() {
    return {
      routeName: 'Home'
    }
  },

  render() {
    return (
      <div block={this.$$block}>
        <Header />
        <main className='main' elem='main'>
          <h1>Hello World</h1>
        </main>
      </div>
    );
  }
});

module.exports = Home;
