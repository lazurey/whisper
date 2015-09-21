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
      title: "粑粑麻麻，别让我输在起跑线上哦--爱你的宝 发自KIZZ APP"
    }
  },

  render() {
    return (
      <DocumentTitle title={this.state.title || 'KIZZ'}>
        <div className="app-download__container">
          <div className="hidden">
            <img src="assets/images/k-300.png" />
          </div>
          <div className="app-download__partial app-download__partial--top">
            <img src="assets/images/app-bg-part-1-header.png" alt="KIZZ Download" />
            <div className="app-download__btn-wrapper">
              <a target="_blank" onClick={this._handleClick} className="btn-app-download" href={tools.APP_URL}>&nbsp;</a>
            </div>
          </div>

          <div className="app-download__partial app-download__partial--gif">
            <div className="app-download__padding--kiss">
              <img className="baby-cry" src="assets/images/baby-kiss.gif" alt="baby cry" />
            </div>
          </div>

          
          <div className="app-download__partial">
            <img src="assets/images/app-bg-part-2-gif-banner.png" alt="KIZZ Download" />  
          </div>

          <div className="app-download__partial app-download__partial--gif">
            <div className="app-download__padding">
              <img className="baby-cry" src="assets/images/baby-cry.gif" alt="baby cry" />
            </div>
            <img className="baby-zoom" src="assets/images/baby-zoom.png" alt="baby cry" />
          </div>

          <div className="app-download__partial">
            <img src="assets/images/app-bg-part-3-static.png" alt="KIZZ Download" />  
          </div>

          <div className="app-download__partial app-download__partial--bottom">
            <img src="assets/images/app-bg-part-4-bottom.png" alt="KIZZ Download" />  
            <div className="app-download__btn-wrapper">
              <a target="_blank" onClick={this._handleClick} className="btn-app-download" href={tools.APP_URL}>&nbsp;</a>
            </div>
          </div>
          <WechatLayer show={this.state.showLayer} />
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = AppDownload;
