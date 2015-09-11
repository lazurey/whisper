var React = require('react'),
    _ = require('lodash'),
    api = require('../data/api'),
    Footer = require('../components/Footer.react'),
    Comment = require('../components/Comment.react'),
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
        
        // console.log("==============");
        // console.log(data);
        // console.log("==============");

        this.setState({
          title: data.Nickname + "的照片 | KIZZ",
          uid: data.AccountId,
          user_page: "/user/" + data.AccountId,
          image: IMAGE_BASE_URL + data.Image,
          nickname: data.Nickname,
          avatar: data.Avatar,
          liked: data.LikeCount,
          replies: data.ReplyCount,
          comments: [data.LastReply1, data.LastReply2, data.LastReply3, data.LastReply4],
          likeList: data.LastLike
        });
      }
    }.bind(this));
  },

  statics: {
    routeName: 'PicShare'
  },

  getDefaultProps() {
    return {
      routeName: 'PicShare'
    }
  },

  getInitialState() {
    return {
      title: "KIZZ",
      uid: "",
      user_page: "",
      image: "",
      avatar: "",
      nickname: "",
      liked: "",
      replies: 0,
      comments: [],
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

    return (
      <DocumentTitle title={this.state.title || 'KIZZ'}>
      <div className="container">
        <div className="main">
          <div className="pic-share__head--simple">
            <div className="pic-share__avatar">
              <Link to="person" params={{uid: this.state.uid}}><img src={this.state.avatar} alt="avatar" /></Link>
            </div>
            <div className="pic-share__info">
              <h3><Link to="person" params={{uid: this.state.uid}}>{this.state.nickname}</Link></h3>
              <div className="pic-share__times"><span className="kizz"></span>被啵<span>{this.state.liked}</span>次</div>
            </div>
            <div className="pic-share__follow">
              <button className="btn btn-primary">+ 关注</button>
            </div>
          </div>
          <div className="pic-share__pic">
            <img src={this.state.image} alt="image" />
          </div>
          <div className="pic-share__share">
            <div className="pure-g">
              <div className="pic-share__kizz pure-u-6-24"><span className="kizz"></span><span className="kizz-text">啵</span></div>
              <div className="pure-u-16-24">
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
          <div className="hot-pic">
            <div className="hot-pic__title"><h2>热门精选</h2></div>
            <InfiniteScroll api="hot_pics" />
          </div>
        </div>
        <Footer />
      </div>
      </DocumentTitle>
    );
  }
});

module.exports = PicShare;
