import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'

import tools from '../utils/tools'
import api from '../data/api'
import {
  WechatLayer,
  Footer,
  Comment,
  Tags,
  InfiniteScroll
} from '../components'

const IMAGE_BASE_URL = "http://7xkvcu.com1.z0.glb.clouddn.com/";

const PicShare = React.createClass({

  _load_picture: function(pid) {

    api.pic_data({id: pid}).then(response => {
      if (this.isMounted()) {
        if (!response) return;
        
        let data = response.objects.data;
        let this_title = data.Nickname + "的照片 | " + tools.APP_SLOGAN;

        this.setState({
          title: this_title,
          uid: data.AccountId,
          user_page: "/user/" + data.AccountId,
          image: IMAGE_BASE_URL + data.Image,
          nickname: data.Nickname,
          avatar: data.Avatar,
          date: data.CreateDate,
          liked: data.LikeCount,
          replies: data.ReplyCount,
          content: data.Content,
          taglist: data.Tags,
          comments: [data.LastReply1, data.LastReply2, data.LastReply3, data.LastReply4],
          likeList: data.LastLike
        });

        tools.update_wx_title(this_title);
      }
    }.bind(this));
  },

  _load_user(uid) {
    api.user_data({id: uid, type: 2, page: 1, size: 1}).then(response => {
      if (this.isMounted()) {
        if (!response) return;
        let userData = response.objects.data;
        this.setState({
          likedTotal: userData.LikeCount
        });

      }
    }.bind(this));
  },

  statics: {
    routeName: 'PicShare'
  },

  _handleClick() {
    this.setState({
      showLayer: tools.is_wechat()
    });
  },

  getDefaultProps() {
    return {
      routeName: 'PicShare'
    }
  },

  getInitialState() {
    return {
      showLayer: false,
      title: tools.APP_SLOGAN,
      uid: "",
      user_page: "",
      image: "",
      avatar: "",
      nickname: "",
      liked: "",
      likedTotal: 0,
      content: "",
      replies: 0,
      comments: [],
      taglist: [],
      likeList: []
    }
  },

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.params.pid !== this.props.params.pid) {
      this._load_picture(nextProps.params.pid);
    }
    if (nextProps.params.uid !== this.props.params.uid) {
      this._load_user(nextProps.params.uid);
    }
  },

  componentWillMount() {
    let pid = this.props.params.pid;
    this._load_picture(pid);
    this._load_user(this.props.params.uid);
  },

  render() {
    let comment_list = this.state.comments;
    let like_list = _.take(this.state.likeList, 3);
    return (
      <DocumentTitle title={this.state.title || 'KIZZ'}>
        <div className="main">
          <div className="hidden">
            <img src="assets/images/k-300.png" />
          </div>
          <div className="container">
            <div className="pic-share__head--simple">
              <div className="pic-share__avatar">
                <Link to="person" params={{uid: this.state.uid}}><img src={this.state.avatar} alt="avatar" /></Link>
              </div>
              <div className="pic-share__info">
                <h3><Link to="person" params={{uid: this.state.uid}}>{this.state.nickname}</Link></h3>
              </div>
              <div className="pic-share__follow">
                <div className="pic-share__times"><span>{this.state.likedTotal}</span>啵</div>
              </div>
            </div>
            <div className="pic-share__pic">
              <img src={this.state.image} alt="image" />
              <Tags taglist={this.state.taglist} date={this.state.date} />
            </div>
            <div className="pic-share__share">
              <p>{this.state.content}</p>
              <div className="pure-g">
                <div className="pure-u-20-24">
                  <ul className="share-user__list">
                    {
                      _.chain(like_list)
                        .uniq()
                        .map(like_user => {
                          return <li>
                                  <Link to="person" params={{uid: like_user.AccountId}}>
                                    <img src={like_user.Avatar} alt="image" />
                                  </Link>
                                </li>;
                        })
                        .value()
                    }
                    <li><span className="pic-share__count">{this.state.liked}</span></li>
                  </ul>
                </div>
                <div className="pic-share__kizz pure-u-4-24"><span className="kizz"></span><span className="kizz-text">啵</span></div>
              </div>
            </div>
            <Comment comments={comment_list} />
            
          </div>
          <Footer />
          <WechatLayer />
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = PicShare;
