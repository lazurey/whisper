var React = require('react'),
    _ = require('lodash'),
    api = require('../data/api'),
    tools = require('../utils/tools'),
    Link = require('react-router').Link,
    Comment = require('../components/Comment.react'),
    Swipeable = require('react-swipeable'),
    DocumentTitle = require('react-document-title');

var Timeline = React.createClass({
  statics: {
    routeName: 'Timeline'
  },

  _load_user: function (uid) {
    // api.user_data({id: uid, type: 2, page: 1, size: 9}).then(function(response) {
    //   if (this.isMounted()) {
    //     if (!response) return;
        
    //     var userData = response.objects.data;
    //     var this_title = userData.Nickname + "的个人主页 | 粑粑麻麻，别让我输在起跑线上哦--爱你的宝 发自KIZZ APP";
    //     this.setState({
    //       title: this_title,
    //       avatar: userData.Avatar,
    //       nickname: userData.Nickname,
    //       piclist: userData.PicList
    //     });

    //     tools.update_wx_title(this_title);
    //   }
    // }.bind(this));
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
        user_id = this.props.params.uid || 15;

    return (
      <DocumentTitle title={this.state.title || 'KIZZ'}>
        <div className="main timeline">
          <div className='container'>
            <div className="timeline-user">
              <img src="/assets/images/example.jpg" />
              <h1>喵喵喵</h1>
            </div>
            <div>
              <ul className="timeline-list">
                <Swipeable  onSwipingLeft={this.swipingLeft} 
                            onSwiped={this.handleSwipeAction} 
                            delta={this.state.threshold} >
                  <li className="timeline-item timeline-item--left">
                    <div className="timeline-item__pic">
                      <img src="/assets/images/example.jpg" />
                    </div>
                    <div>
                      <ul className="bo-list">
                        <li className="bo-item">
                          <Link to="/">
                            <img src="/assets/images/example.jpg" />
                          </Link>  
                        </li>
                      </ul>
                    </div>
                    <div>
                    Comment
                    </div>
                  </li>          
                  <li className="timeline-item timeline-item--current">
                    <div className="timeline-item__pic">
                      <img src="/assets/images/example.jpg" />
                    </div>
                    <div>
                      <ul className="bo-list">
                        <li className="bo-item">
                          <Link to="/">
                            <img src="/assets/images/example.jpg" />
                          </Link>  
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p>Comment</p>
                      <p>Comment</p>
                      <p>Comment</p>
                    </div>
                  </li>
                  <li className="timeline-item timeline-item--right">
                    <div className="timeline-item__pic">
                      <img src="/assets/images/example.jpg" />
                    </div>
                    <div>
                      <ul className="bo-list">
                        <li className="bo-item">
                          <Link to="/">
                            <img src="/assets/images/example.jpg" />
                          </Link>  
                        </li>
                      </ul>
                    </div>
                    <div>
                    Comment
                    </div>
                  </li>
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
