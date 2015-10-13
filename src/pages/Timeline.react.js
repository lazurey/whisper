var React = require('react'),
    _ = require('lodash'),
    api = require('../data/api'),
    tools = require('../utils/tools'),
    Link = require('react-router').Link,
    Picture = require('../components/Picture.react'),
    Swipeable = require('react-swipeable'),
    DocumentTitle = require('react-document-title');

var SWIPE_AT_LEAST = 20,
    PAGE_COUNT = 9;

var Timeline = React.createClass({
  statics: {
    routeName: 'Timeline'
  },

  _load_user: function (uid) {
    api.user_data({id: uid, type: 2, page: this.state.current_page, size: PAGE_COUNT}).then(function(response) {
      if (this.isMounted()) {
        if (!response) return;
        
        var userData = response.objects.data,
            this_title = userData.Nickname + "的时间线 | 粑粑麻麻，别让我输在起跑线上哦--爱你的宝 发自KIZZ APP",
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
        console.log(this.state.loaded_count, this.state.has_more);
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
      title: "粑粑麻麻，别让我输在起跑线上哦--爱你的宝 发自KIZZ APP",
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
    var uid = this.props.params.uid || 15;
    this._load_user(uid);
  },

  handleSwipeEnd(ev, x, y, isFlick) {
    var cur_index = this.state.currentIndex;

    if (x > SWIPE_AT_LEAST) {
      this.setState({
        currentIndex: cur_index + 1,
        timeline_style: {right: 'auto'}
      });
      
    } else if (-x  > SWIPE_AT_LEAST && cur_index > 0) {
      this.setState({
        currentIndex: cur_index - 1,
        timeline_style: {right: 'auto'}
      });
    }

    console.log(this.state.currentIndex, this.state.loaded_count, this.state.has_more);
    if ((this.state.currentIndex >= this.state.loaded_count - 3) && this.state.has_more) {
      console.log("loading more");
      var uid = this.props.params.uid || 15;
      this._load_user(uid);
    }
  },

  handleSwipeLeft(ev, x, y) {
    var new_position = (x == 0) ? "auto" : "" + x;
    this.setState({
      timeline_style: {right: new_position}
    });
  },

  handleSwipeRight(ev, x, y) {
    var new_position = (x == 0) ? "auto" : "" + (-x);
    this.setState({
      timeline_style: {right: new_position}
    });
  },

  render() {
    var pics = this.state.piclist,
        user_id = this.props.params.uid || 15,
        pic_index = 0,
        cur_index = this.state.currentIndex,
        swipe_at_least = SWIPE_AT_LEAST;


    // TO-DO: 三张一下特殊情况

    if (!this.state.has_more && this.state.loaded_count < 3) {
      // 1 ~ 2
    } else if (this.state.loaded_count === 0) {
      // 0
    }

    var timeline = this;
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
                  <div className="timeline-item timeline-item--placeholder">
                    <div className="timeline-item__content">
                      <img src="/assets/images/kizz-grey.png" />
                      <p>你还没有内容哦，赶快来发布吧</p>
                    </div>
                  </div>
                  {
                    _.chain(pics)
                    .uniq()
                    .map(function(pic) {
                      var pid = pic.PicId,
                          pic_url = tools.get_image_url(pic.Image, pic.Type);
                      var item_class = "timeline-item";

                      if (pic_index === cur_index) {
                        item_class += " timeline-item--current";
                      } else if (pic_index + 1 === cur_index) {
                        item_class += " timeline-item--left";
                      } else if (pic_index - 1 === cur_index) {
                        item_class += " timeline-item--right";
                      }

                      pic_index++;
                      return (
                          <div className={item_class} onTouchStart={timeline.handleTouchStart}>
                            <div className="timeline-item__pic">
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
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = Timeline;
