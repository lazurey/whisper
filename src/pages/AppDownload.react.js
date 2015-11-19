import React, { Component } from 'react'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'

import tools from '../utils/tools'
import WechatLayer from '../components/WechatLayer.react'

export default class AppDownload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLayer: false,
      title: tools.APP_SLOGAN
    }

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick() {
    this.setState({
      showLayer: tools.is_wechat()
    });
  }

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
}

AppDownload.statics = {
  routeName: 'AppDownload'
}

AppDownload.defaultProps = {
  routeName: 'AppDownload'
}
