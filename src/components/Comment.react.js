import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router'

export default class Comment extends Component {

  static defaultProps = {
    comments: []
  }

  render() {
    let that = this;
    let comments = this.props.comments || [];
    return <div className="pic-share__comment">
            <ul>
              {
                _.chain(comments)
                  .uniq()
                  .map(comment => {
                    if (!comment) return;
                    let content = (comment.ToNickname) ? "回复" + (comment.ToNickname) + "：" : "";
                    let cc = unescape(JSON.parse('"' + comment.Content + '"'));
                    return <li className="pic-share__comment-item">
                            <Link to="person" params={{uid: comment.AccountId}}>
                              <p>
                                <span className="comment__user">{comment.Nickname}</span>：
                                <span className="comment__content">{content}{cc}</span>
                              </p>
                            </Link>
                          </li>;
                  })
                  .value()
              }
            </ul>
          </div>
  }
}
