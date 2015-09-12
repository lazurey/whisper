var React = require('react'),
    tools = require('../utils/tools'),
    Link = require('react-router').Link;

var Footer = React.createClass({
  render() {
    return (
        <div className="app-promotion">
          <div className="container">
            <div className="app-promotion__logo">
              <img src="assets/images/k-logo.png" alt="kizz" />
            </div>
            <div className="app-promotion__description">
              <p>KIZZ</p>
              <p>最潮的晒娃神器</p>
            </div>
            <div className="app-promotion__link">
              <a target="_blank" href={tools.APP_URL} className="btn btn-primary app-promotion__button">立即下载</a>
            </div>
          </div>
        </div>
    );
  }
});

module.exports = Footer;