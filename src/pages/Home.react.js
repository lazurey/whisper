var React = require('react'),
    _ = require('lodash'),
    api = require('../data/api'),
    Header = require('../components/Header.react'),
    Footer = require('../components/Footer.react'),
    Link = require('react-router').Link;

var IMAGE_BASE_URL = "http://7xkvcu.com1.z0.glb.clouddn.com/";

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

  getDefaultProps() {
    return {
      routeName: 'Home'
    }
  },

  getInitialState() {
    return {
      uid: "",
      avatar: "",
      nickname: "",
      info: "",
      liked: "",
      fans: "",
      follow: "",
      piclist: []
    }
  },

  componentDidMount() {
    var uid = this.props.params.uid || 15;
    api.user_data({id: uid, type: 2, page: 1, size: 9}).then(function(response) {

      if (this.isMounted()) {
        if (!response) return;
        
        var userData = response.objects.data;
        console.log(userData);

        this.setState({
          uid: userData.AccountId,
          avatar: userData.Avatar,
          nickname: userData.Nickname,
          liked: userData.LikeCount,
          fans: userData.FansCount,
          follow: userData.WishCount,
          info: getGender(userData.Gender) + " " + (userData.ProvName || "") + (userData.AreaName || ""),
          piclist: userData.PicList
        });
      }
    }.bind(this));
  },

  render() {
    var pics = this.state.piclist,
        uid = this.state.uid;

    return (
      <div block={this.$$block} className='container'>
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
              <Link className="btn btn-primary" to="/">+ 关注</Link>
            </div>
          </div>
          <ul className="personal-page__tab-tab">
            <li><span data-for="tab-9-grid">img</span></li>
            <li><span data-for="tab-tags">tag</span></li>
          </ul>
          <ul className="personal-page__tab-content">
            <li id="tab-9-grid">
            </li>
            <li id="tab-tags">
              <ul className="image-list">
                {
                  _.chain(pics)
                    .uniq()
                    .map(function(pic) {
                      var pic_share_path = "/share/" + uid + "/" + pic.PicId;
                      var pic_url = IMAGE_BASE_URL + pic.Image;
                      return <li className="image-list__item pure-u-1-3">
                              <Link className="image-list__link" to={pic_share_path}>
                                <img className="image-list__image" src={pic_url} alt="image" />
                              </Link>
                            </li>;
                    })
                    .value()
                }
              </ul>
            </li>
          </ul>
        </div>
        <Footer />
      </div>
    );
  }
});

module.exports = Home;
