var React = require('react'),
    _ = require('lodash'),
    api = require('../data/api'),
    tools = require('../utils/tools'),
    Link = require('react-router').Link,
    Comment = require('../components/Comment.react'),
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
              <ul class="timeline-list">
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
                  Comment
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = Timeline;
