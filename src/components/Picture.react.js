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
    var likes = _.take(this.props.likes, 3) || [];
    var like_total = likes.length;
    return <div>
              <ul className="bo-list">
                {
                  _.chain(likes)
                    .uniq()
                    .map(function(like) {
                      if (!like) return;
                      return <li className="bo-item">
                              <Link to="/">
                                <img src={like.Avatar} />
                              </Link>  
                            </li>
                    })
                    .value()
                }
                <li className="bo-item pic-share__count">{like_total}</li>
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
      create_date: "",
      like_total: 0
    }
  },

  getDefaultProps() {
    return {
      pid: "1851"
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
        var create_date = data.CreateDate;
        create_date = create_date.match(/(.*)T/i);
        create_date = (create_date && create_date.length > 0) ? create_date[1] : "";

        this.setState({
          image: data.Image,
          type: data.Type,
          comment_list: [data.LastReply1, data.LastReply2, data.LastReply3, data.LastReply4],
          like_list: data.LastLike,
          create_date: create_date,
          like_total: data.LikeCount
        });
      }
    }.bind(this));
  },

  render() {
    var comment_list = this.state.comment_list,
        like_list = this.state.like_list;

    return (
      <div className="pic-info">
        <Likes likes={like_list} />
        <Comment comments={comment_list} />
        <div className="timeline-date">{this.state.create_date}</div>
      </div>
    );
  }
});

module.exports = Picture;