import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router'

import tools from '../utils/tools'
import api from '../data/api'
import Comment from '../components/Comment.react'


class Likes extends Component {

  static defaultProps = {
    likes: []
  }
  
  render() {
    let likes = _.take(this.props.likes, 3) || [];
    let like_total = likes.length;
    return <div>
              <ul className="bo-list">
                {
                  _.chain(likes)
                    .uniq()
                    .map(like => {
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
}

export default class Picture extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      image: "",
      type: "",
      comment_list: [],
      list_list: [],
      create_date: "",
      like_total: 0,
      isMounted: false
    };
  }

  static defaultProps = {
    pid: "1851"
  }

  componentDidMount() {
    this.setState({isMounted: true});
    this._load_pic_data(this.props.pid);
  }

  _load_pic_data(pid) {
    api.pic_data({id: pid}).then(response => {
      if (this.state.isMounted) {
        if (!response) return;
        let data = response.objects.data;
        let create_date = data.CreateDate;
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
  }

  render() {
    let comment_list = this.state.comment_list,
        like_list = this.state.like_list;

    return (
      <div className="pic-info">
        <Likes likes={like_list} />
        <Comment comments={comment_list} />
        <div className="timeline-date">{this.state.create_date}</div>
      </div>
    );
  }

}
