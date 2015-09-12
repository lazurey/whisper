var React = require('react'),
    _ = require('lodash'),
    api = require('../data/api'),
    tools = require('../utils/tools'),
    Header = require('../components/Header.react'),
    Footer = require('../components/Footer.react'),
    InfiniteScroll = require('../components/InfiniteScroll.react'),
    Link = require('react-router').Link,
    DocumentTitle = require('react-document-title');

function getGender(code) {
  if (code == 1) {
    return "男";
  } else if (code == 2) {
    return "女";
  } else {
    return "未知";
  }
}

var Home = React.createClass({
  statics: {
    routeName: 'Home'
  },

  _load_user: function (uid) {
    api.user_data({id: uid, type: 2, page: 1, size: 9}).then(function(response) {
      if (this.isMounted()) {
        if (!response) return;
        
        var userData = response.objects.data;
        var this_title = userData.Nickname + "的个人主页 | KIZZ";
        this.setState({
          title: this_title,
          avatar: userData.Avatar,
          nickname: userData.Nickname,
          liked: userData.LikeCount,
          fans: userData.FansCount,
          follow: userData.WishCount,
          info: getGender(userData.Gender) + " " + (userData.ProvName || "") + (userData.AreaName || ""),
          piclist: userData.PicList
        });

        tools.update_wx_title(this_title);
      }
    }.bind(this));
  },

  getDefaultProps() {
    return {
      routeName: 'Home'
    }
  },

  getInitialState() {
    return {
      title: "KIZZ",
      avatar: "",
      nickname: "",
      info: "",
      liked: "",
      fans: "",
      follow: "",
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
        <div>
          <div className='container'>
            <Header />
            <div className="main">
              <div className="personal-page__header pure-g">
                <div className="personal-page__header-avatar pure-u-6-24">
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
                    </li>
                  </ul>
                </div>
                <div className="pure-u-6-24">
                  <a target="_blank" className="btn btn-primary" href={tools.APP_URL}>+ 关注</a>
                </div>
              </div>
              <InfiniteScroll api="personal" uid={user_id} />
            </div>
          </div>
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = Home;
