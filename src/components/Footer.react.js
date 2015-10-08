var React = require('react'),
    tools = require('../utils/tools'),
    WechatLayer = require('./WechatLayer.react'),
    Link = require('react-router').Link;

var Footer = React.createClass({

  getInitialState() {
    return {
      showLayer: false
    }
  },

  _handleClick() {
    this.setState({
      showLayer: tools.is_wechat()
    });
  },

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
                <p>史上最潮的晒娃神器</p>
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
});

module.exports = Footer;