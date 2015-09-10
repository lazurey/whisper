var React = require('react'),
    _ = require('lodash'),
    api = require('../data/api'),
    Footer = require('../components/Footer.react'),
    InfiniteScroll = require('../components/InfiniteScroll.react'),
    Link = require('react-router').Link;

var IMAGE_BASE_URL = "http://7xkvcu.com1.z0.glb.clouddn.com/";

var PicShare = React.createClass({
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
      image: "",
      avatar: "",
      nickname: "",
      liked: "",
      replies: 0,
      likeList: []
    }
  },

  componentDidMount() {
    var pid = this.props.params.pid;
    console.log(pid);

    api.pic_data({id: pid}).then(function(response) {
      if (this.isMounted()) {
        if (!response) return;
        
        var data = response.objects.data;
        console.log(data);

        this.setState({
          image: IMAGE_BASE_URL + data.Image,
          nickname: data.Nickname,
          avatar: data.Avatar,
          liked: data.LikeCount,
          replies: data.ReplyCount,
          likeList: data.LastLike
        });
      }
    }.bind(this));
  },

  render() {
    var like_list = this.state.likeList;
    return (
      <div className="container">
        <div className="main">
          <div className="pic-share__head--simple">
            <div className="pic-share__avatar">
              <img src={this.state.avatar} alt="avatar" />
            </div>
            <div className="pic-share__info">
              <h3>{this.state.nickname}</h3>
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
                        var like_user_id = like_user.AccountId;
                        var user_path = "/user/" + like_user_id,
                            like_pic = like_user.Avatar;
                        return <li>
                                <Link to={user_path}>
                                  <img src={like_pic} alt="image" />
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
          <div className="pic-share__comment">
            <ul>
              <li className="pic-share__comment-item">
                <p>
                  <span className="comment__user">村口王师傅</span>：
                  <span className="comment__content">你好，烫头五块钱。</span>
                </p>
              </li>
              <li className="pic-share__comment-item">
                <p>
                  <span className="comment__user">村口王师傅</span>：
                  <span className="comment__content">你好，烫头五块钱。</span>
                </p>
              </li>
              <li className="pic-share__comment-item">
                <p>
                  <span className="comment__user">村口王师傅</span>：
                  <span className="comment__content">你好，烫头五块钱。</span>
                </p>
              </li>
              <li className="pic-share__comment-item">
                <p>
                  <span className="comment__user">村口王师傅</span>：
                  <span className="comment__content">你好，烫头五块钱。</span>
                </p>
              </li>
              <li>
                <Link to="/">查看全部<span>16</span>条评论</Link>
              </li>
            </ul>
          </div>
          <div className="hot-pic">
            <div className="hot-pic__title"><h2>热门精选</h2></div>
            <InfiniteScroll api="hot_pics" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
});

module.exports = PicShare;
