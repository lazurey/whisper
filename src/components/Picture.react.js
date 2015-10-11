var React = require('react'),
    api = require('../data/api'),
    _ = require('lodash'),
    tools = require('../utils/tools'),
    Comment = require('../components/Comment.react'),
    Link = require('react-router').Link;

var PAGE_COUNT = 9;

var Likes = React.createClass({
  getDefaultProps() {
    return {
      likes: []
    }
  },

  render() {
    var likes = this.props.likes || [];
    return <div>
              <ul className="bo-list">
                {
                  _.chain(likes)
                    .uniq()
                    .map(function(like) {
                      if (!like) return;
                      console.log(like);
                      return <li className="bo-item">
                              <Link to="/">
                                <img src={like.Avatar} />
                              </Link>  
                            </li>
                    })
                    .value()
                }
              </ul>
            </div>
  }

});

var Picture = React.createClass({
  
  getInitialState() {
    return {
      page: 1,
      image: "",
      type: "",
      comment_list: [],
      list_list: [],
      like_total: 0
    }
  },

  getDefaultProps() {
    return {
      pid: "1851",
      currentIndex: 0,
      picIndex: 0
    }
  },

  componentDidMount() {
    this._load_pic_data(this.props.pid);
  },

  _load_pic_data: function(pid) {
    api.pic_data({id: pid}).then(function(response) {
      if (this.isMounted()) {
        if (!response) return;
        var data = response.objects.data;
        // console.log(data);
        this.setState({
          image: data.Image,
          type: data.Type,
          comment_list: [data.LastReply1, data.LastReply2, data.LastReply3, data.LastReply4],
          like_list: data.LastLike,
          like_total: data.LikeCount
        });
      }
    }.bind(this));
  },

  render() {
    var comment_list = this.state.comment_list,
        like_list = this.state.like_list,
        pic_url = tools.get_image_url(this.state.image, this.state.type);

    var item_class = "timeline-item";

    if (this.props.picIndex === this.props.currentIndex) {
      item_class += " timeline-item--current";
    } else if (this.props.picIndex + 1 === this.props.currentIndex) {
      item_class += " timeline-item--left";
    } else if (this.props.picIndex - 1 === this.props.currentIndex) {
      item_class += " timeline-item--right";
    }

    return (
      <li className={item_class}>
        <div className="timeline-item__pic">
          <img src={pic_url} alt="image" />
        </div>
        <Likes likes={like_list} />
        <div className="pic-share__count">{this.state.like_total}</div>
        <Comment comments={comment_list} />
      </li>
    );
  }
});

module.exports = Picture;