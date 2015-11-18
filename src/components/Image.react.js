import React, { Component } from 'react'


export default class Image extends Component {
  static defaultProps = {
    src: "assets/images/loading.gif",
    alt: "image",
    style: "image"
  }

  render() {
    return (
        <img src={this.props.src} alt={this.props.alt} className={this.props.style} />
    );
  }
}

// var Image = React.createClass({

//   getDefaultProps() {
//     return {
//       src: "assets/images/loading.gif",
//       alt: "image",
//       style: "image"
//     }
//   },


//   render() {
//     return (
//         <img src={this.props.src} alt={this.props.alt} className={this.props.style} />
//     );
//   }
// });

// module.exports = Image;