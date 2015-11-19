import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'

import tools from '../utils/tools'
import api from '../data/api'
import {
  WechatLayer,
  Header,
  Footer,
  InfiniteScroll
} from '../components'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLayer: false,
      title: tools.APP_SLOGAN,
      avatar: "",
      nickname: "",
      info: "",
      liked: "",
      fans: "",
      follow: "",
      isMounted: false,
      piclist: []
    }
    this._handleClick = this._handleClick.bind(this);
  }

  static statics = {
    routeName: 'Home'
  }

  static defaultProps = {
    routeName: 'Home' 
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.params.uid !== this.props.params.uid) {
      this._load_user(nextProps.params.uid);
    }
  }

  componentDidMount() {
    let uid = this.props.params.uid || 15;
    this._load_user(uid);
    this.setState({ isMounted: true });
  }

  _handleClick() {
    this.setState({
      showLayer: tools.is_wechat()
    });
  }

  _load_user(uid) {
    api.user_data({id: uid, type: 2, page: 1, size: 9}).then(response => {
      if (this.state.isMounted) {
        if (!response) return;
        
        let userData = response.objects.data;
        let this_title = userData.Nickname + "的个人主页 | " + tools.APP_SLOGAN;
        this.setState({
          title: this_title,
          avatar: userData.Avatar,
          nickname: userData.Nickname,
          liked: userData.LikeCount,
          fans: userData.FansCount,
          follow: userData.WishCount,
          info: tools.getGender(userData.Gender) + " " + (userData.ProvName || "") + (userData.AreaName || ""),
          piclist: userData.PicList
        });

        tools.update_wx_title(this_title);
      }
    }.bind(this));
  }

  render() {
    let pics = this.state.piclist,
        user_id = this.props.params.uid || 15;

    return (
      <DocumentTitle title={this.state.title || 'KIZZ'}>
        <div className="main">
          <div className="hidden">
            <img src="assets/images/k-300.png" />
          </div>
          <div className='container'>
            <Header />
            <div>
              <div className="personal-page__header pure-g">
                <div className="personal-page__header-avatar pure-u-5-24">
                  <img src={this.state.avatar} alt="avatar" />
                </div>
                <div className="pure-u-12-24">
                  <ul className="pure-g">
                    <li className="personal-page__header-data pure-u-1-3">
                      <label>被啵</label>
                      <span>{this.state.liked}</span>
                    </li>
                    <li className="personal-page__header-data pure-u-1-3">
                      <label>关注</label>
                      <span>{this.state.follow}</span>
                    </li>
                    <li className="personal-page__header-data pure-u-1-3">
                      <label>粉丝</label>
                      <span>{this.state.fans}</span>
                    </li>
                    <li className="personal-page__header-detail pure-u-3-3">
                      <p>{this.state.info}</p>
                      <p>个人简介</p>
                    </li>
                  </ul>
                </div>
                <div className="pure-u-7-24 person-page__follow">
                  <a target="_blank" onClick={this._handleClick} className="btn btn-primary btn-follow" href={tools.APP_URL}>+ 关注</a>
                </div>
              </div>
              <InfiniteScroll api="personal" uid={user_id} />
            </div>
          </div>
          <Footer />
          <WechatLayer show={this.state.showLayer} />
        </div>
      </DocumentTitle>
    );
  }
}
