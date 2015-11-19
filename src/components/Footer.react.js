import React, { Component } from 'react'
import tools from '../utils/tools'
import WechatLayer from './WechatLayer.react'
import { Link } from 'react-router'


export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {showLayer: false};
    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick() {
    this.setState({
      showLayer: tools.is_wechat()
    });
  }

  render() {
    return (
        <div>
          <div className="app-promotion">
            <div className="container">
              <div className="app-promotion__logo">
                <img src="assets/images/k-logo.png" alt="kizz" />
              </div>
              <div className="app-promotion__description">
                <p>KIZZ</p>
                <p>史上zui潮晒娃神器</p>
              </div>
              <div className="app-promotion__link">
                <a target="_blank" href={tools.APP_URL} onClick={this._handleClick} className="btn btn-primary app-promotion__button">立即下载</a>
              </div>
            </div>
          </div>
          <WechatLayer show={this.state.showLayer} />
        </div>
    );
  }
}
