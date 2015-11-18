import React from 'react'
import tools from '../utils/tools'
import { Link } from 'react-router'

const WechatLayer = React.createClass({
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
    let show_style = (this.props.show && this.state.show) ? "wechat-layer" : "wechat-layer wechat-layer--hidden";
    return (
        <div className={show_style}>
          <div className="arrow">
            <img src="assets/images/arrow.png" />
          </div>
          <p>点击这里，选择Safari/浏览器打开下载app。</p>
          <button onClick={this._closeLayer} className="btn btn-wide btn-light close">关闭</button>
        </div>
    );
  }
});

module.exports = WechatLayer;