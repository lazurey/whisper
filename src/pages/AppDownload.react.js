var React = require('react'),
    tools = require('../utils/tools'),
    WechatLayer = require('../components/WechatLayer.react'),
    Link = require('react-router').Link,
    DocumentTitle = require('react-document-title');

var AppDownload = React.createClass({
  statics: {
    routeName: 'AppDownload'
  },

  _handleClick() {
    this.setState({
      showLayer: tools.is_wechat()
    });
  },

  getDefaultProps() {
    return {
      routeName: 'AppDownload'
    }
  },

  getInitialState() {
    return {
      showLayer: false,
      title: "KIZZ"
    }
  },

  render() {
    return (
      <DocumentTitle title={this.state.title || 'KIZZ'}>
        <div className="app-download__container">
          <div className="app-download__partial app-download__partial--top">
            <img src="assets/images/app-bg-part-1.png" alt="KIZZ Download" />
            <div className="app-download__btn-wrapper">
              <a target="_blank" onClick={this._handleClick} className="btn-app-download" href={tools.APP_URL}>&nbsp;</a>
            </div>
          </div>
          <div className="app-download__partial app-download__partial--middle">
            <div className="app-download__padding">
              <img className="baby-cry" src="assets/images/baby-cry.gif" alt="baby cry" />
            </div>
            <img className="baby-zoom" src="assets/images/baby-zoom.png" alt="baby cry" />
          </div>
          <div className="app-download__partial app-download__partial--bottom">
            <img src="assets/images/app-bg-part-2.png" alt="KIZZ Download" />  
            <div className="app-download__btn-wrapper">
              <a target="_blank" onClick={this._handleClick} className="btn-app-download" href={tools.APP_URL}>&nbsp;</a>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = AppDownload;
