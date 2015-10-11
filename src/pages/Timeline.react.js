var React = require('react'),
    _ = require('lodash'),
    api = require('../data/api'),
    tools = require('../utils/tools'),
    Link = require('react-router').Link,
    Comment = require('../components/Comment.react'),
    Picture = require('../components/Picture.react'),
    Swipeable = require('react-swipeable'),
    DocumentTitle = require('react-document-title');

var Timeline = React.createClass({
  statics: {
    routeName: 'Timeline'
  },

  _load_user: function (uid) {
    api.user_data({id: uid, type: 2, page: 1, size: 9}).then(function(response) {
      if (this.isMounted()) {
        if (!response) return;
        
        var userData = response.objects.data;
        var this_title = userData.Nickname + "的个人主页 | 粑粑麻麻，别让我输在起跑线上哦--爱你的宝 发自KIZZ APP";
        console.log(userData.PicList);

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

  _load_pic_data: function(pid) {
    api.pic_data({id: pid}).then(function(response) {
      if (this.isMounted()) {
        if (!response) return;
        var data = response.objects.data;
        console.log(data);
        return data;
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
      currentIndex: 1,
      title: "KIZZ",
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

  swipingLeft(event, x) {
    
  },

  handleSwipeAction(ev, x, y, isFlick) {
    var oldIndex = this.state.currentIndex;
    console.log("handle swipe action");
    console.log(x, y, oldIndex);

    if (x > 90) {
      this.setState({
        currentIndex: oldIndex + 1
      });
    } else if (x < -90 && oldIndex > 1) {
      this.setState({
        currentIndex: oldIndex - 1
      });
    }
  },

  render() {
    var pics = this.state.piclist,
        user_id = this.props.params.uid || 15,
        pic_index = 0,
        cur_index = this.state.currentIndex;


    return (
      <DocumentTitle title={this.state.title || 'KIZZ'}>
        <div className="main timeline">
          <div className='container'>
            <div className="timeline-user">
              <img src={this.state.avatar} alt="avatar" />
              <h1>{this.state.nickname}</h1>
            </div>
            <div>
              <ul className="timeline-list">
                <Swipeable  onSwipingLeft={this.swipingLeft} 
                            onSwiped={this.handleSwipeAction} 
                            delta={this.state.threshold} >
                  {
                    _.chain(pics)
                    .uniq()
                    .map(function(pic) {
                      var pid = pic.PicId;
                      pic_index++;
                      return <Picture pid={pid} currentIndex={cur_index} picIndex={pic_index} />;
                    })
                    .value()
                  }
                  
                </Swipeable>
              </ul>
            </div>
            <div>
            <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <img src="/assets/images/time-line.png" />
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = Timeline;
