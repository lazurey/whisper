import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router'

export default class Comment extends Component {

  static defaultProps = {
    comments: []
  }

  render() {
    let comments = this.props.comments || [];
    return <div className="pic-share__comment">
            <ul>
              {
                _.chain(comments)
                  .uniq()
                  .map(comment => {
                    if (!comment) return;
                    let content = (comment.ToNickname) ? "回复" + (comment.ToNickname) + "：" : "";
                    return <li className="pic-share__comment-item">
                            <Link to="person" params={{uid: comment.AccountId}}>
                              <p>
                                <span className="comment__user">{comment.Nickname}</span>：
                                <span className="comment__content">{content}{comment.Content}</span>
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
