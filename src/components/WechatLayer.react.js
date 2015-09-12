var React = require('react'),
    tools = require('../utils/tools'),
    Link = require('react-router').Link;

var WechatLayer = React.createClass({
  getDefaultProps() {
    return {
      show: false
    }
  },

  getInitialState() {
    return {
      show: true
    }
  },

  componentWillReceiveProps() {
    this.setState({
      show: true
    })
  },

  _closeLayer() {
    this.setState({
      show: false
    })
  },

  render() {
    var show_style = (this.props.show && this.state.show) ? "wechat-layer" : "wechat-layer wechat-layer--hidden";
    return (
        <div className={show_style}>
          <a href="javascript;" onClick={this._closeLayer} className="close">x</a>
          <div className="arrow">
            <img src="assets/images/arrow.png" />
          </div>
          <p>点击这里，选择Safari/浏览器打开下载app。</p>
        </div>
    );
  }
});

module.exports = WechatLayer;