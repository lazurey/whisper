var React = require('react'),
    _ = require('lodash'),
    api = require('../data/api'),
    tools = require('../utils/tools'),
    Footer = require('../components/Footer.react'),
    Comment = require('../components/Comment.react'),
    Tags = require('../components/Tags.react'),
    WechatLayer = require('../components/WechatLayer.react'),
    InfiniteScroll = require('../components/InfiniteScroll.react'),
    Link = require('react-router').Link,
    DocumentTitle = require('react-document-title');

var IMAGE_BASE_URL = "http://7xkvcu.com1.z0.glb.clouddn.com/";

var PicShare = React.createClass({

  _load_picture: function(pid) {

    api.pic_data({id: pid}).then(function(response) {
      if (this.isMounted()) {
        if (!response) return;
        
        var data = response.objects.data;
        var this_title = data.Nickname + "的照片 | 粑粑麻麻，别让我输在起跑线上哦--爱你的宝 发自KIZZ APP";

        this.setState({
          title: this_title,
          uid: data.AccountId,
          user_page: "/user/" + data.AccountId,
          image: IMAGE_BASE_URL + data.Image,
          nickname: data.Nickname,
          avatar: data.Avatar,
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
      title: "粑粑麻麻，别让我输在起跑线上哦－－爱你的宝 发自KIZZ APP",
      uid: "",
      user_page: "",
      image: "",
      avatar: "",
      nickname: "",
      liked: "",
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
  },

  componentWillMount() {
    var pid = this.props.params.pid;
    this._load_picture(pid);
  },

  render() {
    var comment_list = this.state.comments;

    var like_list = this.state.likeList;
    // <InfiniteScroll api="hot_pics" />

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
                <div className="pic-share__times"><span className="kizz kizz--small"></span>总数<span>{this.state.liked}</span>次</div>
              </div>
              <div className="pic-share__follow">
                <a target="_blank" className="btn btn-primary" onClick={this._handleClick} href={tools.APP_URL}><span className="follow__plus">+</span> 关注</a>
              </div>
            </div>
            <div className="pic-share__pic">
              <img src={this.state.image} alt="image" />
              <Tags taglist={this.state.taglist} />
            </div>
            <div className="pic-share__share">
              <p>{this.state.content}</p>
              <div className="pure-g">
                <div className="pic-share__kizz pure-u-4-24"><span className="kizz"></span><span className="kizz-text">啵</span></div>
                <div className="pure-u-18-24">
                  <ul className="share-user__list">
                    {
                      _.chain(like_list)
                        .uniq()
                        .map(function(like_user) {
                          return <li>
                                  <Link to="person" params={{uid: like_user.AccountId}}>
                                    <img src={like_user.Avatar} alt="image" />
                                  </Link>
                                </li>;
                        })
                        .value()
                    }
                  </ul>
                </div>
                <div className="pure-u-2-24">
                  <div className="pic-share__count">{this.state.liked}</div>
                </div>
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
