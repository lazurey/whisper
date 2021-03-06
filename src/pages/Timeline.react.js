import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'
import Swipeable from 'react-swipeable'

import tools from '../utils/tools'
import api from '../data/api'
import {
  Picture
} from '../components'

const SWIPE_AT_LEAST = 20,
    PAGE_COUNT = 9;

const Timeline = React.createClass({
  statics: {
    routeName: 'Timeline'
  },

  connectWebViewJavascriptBridge: function (callback) {
    console.log("connecting web view js bridge");
    if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge);
    } else {
      document.addEventListener('WebViewJavascriptBridgeReady', function() {callback(WebViewJavascriptBridge);}, false);
    }
  },

  _load_user: function (uid) {
    api.user_data({id: uid, type: 2, page: this.state.current_page, size: PAGE_COUNT}).then(function(response) {
      if (this.isMounted()) {
        if (!response) return;
        
        let userData = response.objects.data,
            this_title = userData.Nickname + "的时间线 | " + tools.APP_SLOGAN,
            cur_piclist = this.state.piclist || [],
            cur_page = this.state.current_page;

        this.setState({
          has_more: (userData.PicList.length === PAGE_COUNT),
          title: this_title,
          loaded_count: (cur_page - 1) * PAGE_COUNT + userData.PicList.length,
          avatar: userData.Avatar,
          current_page: cur_page + 1,
          nickname: userData.Nickname,
          piclist: cur_piclist.concat(userData.PicList)
        });
        // console.log(this.state.loaded_count, this.state.has_more);
      }
    }.bind(this));
  },

  getDefaultProps() {
    return {
      routeName: 'Timeline'
    }
  },

  getInitialState() {
    return {
      threshold: 60,
      timeline_style: {right: 'auto'},
      currentIndex: 0,
      loaded_count: 0,
      has_more: true,
      current_page: 1,
      title: tools.APP_SLOGAN,
      avatar: "",
      nickname: "",
      piclist: []
    }
  },

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.params.uid !== this.props.params.uid) {
      this._load_user(nextProps.params.uid);
    }
  },

  componentDidMount() {
    document.body.style.height = "100%";
    document.getElementsByTagName('html')[0].style.height = "100%";
    var uid = this.props.params.uid || 15;
    this._load_user(uid);

    this.connectWebViewJavascriptBridge(function(bridge) {
      bridge.init(function(message, responseCallback) {
          log('JS got a message', message)
          var data = { 'Javascript Responds':'Wee!' }
          log('JS responding with', data)
          responseCallback(data)
      });
    });
  },

  handleClick(pid) {
    this.connectWebViewJavascriptBridge(function(bridge) {
      bridge.send({"pid": pid});
      bridge.callHandler('openAppPicView', {'pid': pid}, function(response) {
        console.log("call handler done");
      });
    });
  },

  handleSwipeEnd(ev, x, y, isFlick) {
    var cur_index = this.state.currentIndex;
    if (x > SWIPE_AT_LEAST && cur_index < this.state.loaded_count - 1) {
      this.setState({
        currentIndex: cur_index + 1
      });
      
    } else if (-x  > SWIPE_AT_LEAST && cur_index > 0) {
      this.setState({
        currentIndex: cur_index - 1
      });
    }

    this.setState({
      timeline_style: {right: 'auto'}
    });

    if ((this.state.currentIndex >= this.state.loaded_count - 3) && this.state.has_more) {
      var uid = this.props.params.uid || 15;
      this._load_user(uid);
    }
  },

  _processPosition(direction, x) {
    var new_x_position = (x == 0) ? "auto" : "" + (direction === "left") ? x : (-x);

    if (direction === "left") {
      this.setState({
        timeline_style: {right: new_x_position}
      });
    } else {
      this.setState({
        timeline_style: {left: new_x_position}
      });
    }
  },

  handleSwipeLeft(ev, x, y) {
    this._processPosition("left", x);
  },

  handleSwipeRight(ev, x, y) {
    this._processPosition("right", x);
  },

  render() {
    let pics = this.state.piclist,
        user_id = this.props.params.uid || 15,
        pic_index = 0,
        cur_index = this.state.currentIndex,
        swipe_at_least = SWIPE_AT_LEAST;

    let placeholder_image_class = "timeline-item timeline-item--placeholder";
    if (!this.state.has_more && this.state.loaded_count == 2 && this.state.loaded_count == 1) {
      placeholder_image_class += " timeline-item--right";
    } else if (!this.state.has_more && this.state.loaded_count === 0) {
      placeholder_image_class += " timeline-item--current";
    }

    let timeline = this;
    return (
      <DocumentTitle title={this.state.title || 'KIZZ'}>
        <div className="main timeline">
          <div className='container'>
            <div className="timeline-user">
              <img src={this.state.avatar} alt="avatar" />
              <h1>{this.state.nickname}</h1>
            </div>
            <div className="timeline-content">
              <div className="timeline-list" style={this.state.timeline_style}>
                <Swipeable
                  onSwiped={this.handleSwipeEnd}
                  onSwipingLeft={this.handleSwipeLeft}
                  onSwipingRight={this.handleSwipeRight}
                  delta={swipe_at_least}>
                  <div className={placeholder_image_class}>
                    <div className="timeline-item__content">
                      <img src="/assets/images/kizz-grey.png" />
                      <p>你还没有内容哦，赶快来发布吧</p>
                    </div>
                  </div>
                  {
                    _.chain(pics)
                    .uniq()
                    .map(pic => {
                      var pid = pic.PicId,
                          pic_url = tools.get_image_url(pic.Image, pic.Type);
                      var item_class = "timeline-item";

                      switch (pic_index) {
                        case (cur_index - 2):
                          item_class += " timeline-item--leftest";
                          break;
                        case (cur_index - 1):
                          item_class += " timeline-item--left";
                          break;
                        case (cur_index):
                          item_class += " timeline-item--current";
                          break;
                        case (cur_index + 1):
                          item_class += " timeline-item--right";
                          break;
                        case (cur_index + 2):
                          item_class += " timeline-item--rightest";
                          break;
                        default:
                          break;
                      }

                      pic_index++;
                      return (
                          <div className={item_class} onTouchStart={timeline.handleTouchStart}>
                            <div className="timeline-item__pic" onClick={timeline.handleClick.bind(this, pid)}>
                              <img src={pic_url} />
                            </div>
                            <Picture pid={pid} />
                          </div>
                      );
                    })
                    .value()
                  }
                  </Swipeable>
              </div>
              <div className="timeline-line">
                <img src="/assets/images/time-line.png" />
                <div className="timeline-dot timeline-dot--left timeline-dot--grey"></div>
                <div className="timeline-dot timeline-dot--current"></div>
                <div className="timeline-dot timeline-dot--right timeline-dot--grey"></div>
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = Timeline;
