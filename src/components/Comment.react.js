var React = require('react'),
    _ = require('lodash'),
    Link = require('react-router').Link;

var Comment = React.createClass({

  getDefaultProps() {
    return {
      comments: []
    }
  },

  render() {
    var comments = this.props.comments || [];
    return <div className="pic-share__comment">
            <ul>
              {
                _.chain(comments)
                  .uniq()
                  .map(function(comment) {
                    if (!comment) return;
                    return <li className="pic-share__comment-item">
                            <Link to="person" params={{uid: comment.AccountId}}>
                              <p>
                                <span className="comment__user">{comment.Nickname}</span>：
                                <span className="comment__content">{comment.Content}</span>
                              </p>
                            </Link>
                          </li>;
                  })
                  .value()
              }
              <li className="pic-share__comment-item">
                <Link to="person" params={{uid: 15}}>
                  <p>
                    <span className="comment__user">照照</span>：
                    <span className="comment__content">你猜</span>
                  </p>
                </Link>
              </li>
              <li className="pic-share__comment-item">
                <Link to="person" params={{uid: 15}}>
                  <p>
                    <span className="comment__user">照照</span>：
                    <span className="comment__content">你猜</span>
                  </p>
                </Link>
              </li>
              <li className="pic-share__comment-item">
                <Link to="person" params={{uid: 15}}>
                  <p>
                    <span className="comment__user">照照</span>：
                    <span className="comment__content">你猜</span>
                  </p>
                </Link>
              </li>
            </ul>
          </div>
  }
});

module.exports = Comment;