var React = require('react');

var Image = React.createClass({

  getDefaultProps() {
    return {
      src: "assets/images/loading.gif",
      alt: "image",
      style: "image"
    }
  },


  render() {
    return (
        <img src={this.props.src} alt={this.props.alt} className={this.props.style} />
    );
  }
});

module.exports = Image;