import React, { Component } from 'react'


export default class Image extends Component {

  render() {
    return (
        <img src={this.props.src} alt={this.props.alt} className={this.props.style} />
    );
  }
}

Image.defaultProps = {
  src: "assets/images/loading.gif",
  alt: "image",
  style: "image"
}