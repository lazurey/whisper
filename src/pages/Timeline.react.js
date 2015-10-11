var React = require('react'),
    _ = require('lodash'),
    api = require('../data/api'),
    tools = require('../utils/tools'),
    Link = require('react-router').Link,
    Picture = require('../components/Picture.react'),
    Swipeable = require('react-swipeable'),
    DocumentTitle = require('react-document-title');

var SWIPE_AT_LEAST = 90;

var Timeline = React.createClass({
  statics: {
    routeName: 'Timeline'
  },

  _load_user: function (uid) {
    api.user_data({id: uid, type: 2, page: 1, size: 9}).then(function(response) {
      if (this.isMounted()) {
        if (!response) return;
        
        var userData = response.objects.data;
        var this_title = userData.Nickname + "的时间线 | 粑粑麻麻，别让我输在起跑线上哦--爱你的宝 发自KIZZ APP";

        this.setState({
          title: this_title,
          avatar: userData.Avatar,
          nickname: userData.Nickname,
          piclist: userData.PicList
        });

      }
    }.bind(this));
    console.log("loading user");
  },

  getDefaultProps() {
    return {
      routeName: 'Timeline'
    }
  },

  getInitialState() {
    return {
      threshold: 60,
      currentIndex: 0,
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

  handleSwipeAction(ev, x, y, isFlick) {
    console.log(x, y);
    var cur_index = this.state.currentIndex;

    if (x > SWIPE_AT_LEAST) {
      console.log("swipe to left enough");
      this.setState({
        currentIndex: cur_index + 1
      });
      
    } else if (-x  > SWIPE_AT_LEAST && cur_index > 0) {
      console.log("swipe to right enough");
      this.setState({
        currentIndex: cur_index - 1
      });
    }
  },

  render() {
    var pics = this.state.piclist,
        user_id = this.props.params.uid || 15,
        pic_index = 0,
        cur_index = this.state.currentIndex,
        swipe_at_least = SWIPE_AT_LEAST;

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
              <div className="timeline-list">
                <Swipeable
                  onSwiped={this.handleSwipeAction}
                  delta={swipe_at_least}>
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
