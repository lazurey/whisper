var React = require('react'),
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
              <a target="_blank" href="https://itunes.apple.com/cn/app/kizz/id1031704971?l=zh&ls=1&mt=8" className="btn btn-primary app-promotion__button">立即打开</a>
            </div>
          </div>
        </div>
    );
  }
});

module.exports = Footer;