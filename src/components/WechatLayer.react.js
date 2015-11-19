import React, { Component } from 'react'
import tools from '../utils/tools'
import { Link } from 'react-router'

export default class WechatLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    }
    this._closeLayer = this._closeLayer.bind(this);
  }

  static defaultProps = {
    show: false
  }

  componentWillReceiveProps() {
    this.setState({
      show: true
    })
  }

  _closeLayer() {
    this.setState({
      show: false
    })
  }

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
}
