import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router'

const changeDate = new Date(2015, 9, 31);

const Tags = React.createClass({

  getDefaultProps() {
    return {
      taglist: [],
      date: "20151101"
    }
  },

  _checkDate(dateStr) {
    let year = parseInt(dateStr.slice(0, 4)),
        month = parseInt(dateStr.slice(4, 6)) - 1,
        day = parseInt(dateStr.slice(6, 8));
    let createDate = new Date(year, month, day);
    return (createDate > changeDate);
  },

  _getPosition(x, y) {
    if (this._checkDate(this.props.date)) {
      // use new position
      let baseWidth = (screen.width > 640) ? 640 : screen.width;
      x = baseWidth / x;
      y = baseWidth / y;
    }
    return {"left": x, "top": y};
  },

  render() {
    let taglist = this.props.taglist || [];
    let that = this;
    return <div className="pic-share__tags">
              {
                _.chain(taglist)
                  .uniq()
                  .map(tag => {
                    if (!tag) return;
                    let tag_style = "pic-share__tag-item ";
                    tag_style += (tag.P == 1) ? " tag--left" : " tag--right";
                    let pos = that._getPosition(tag.X, tag.Y);
                    return <div className={tag_style} style={pos}>
                              <div className="tag-icon--container">
                                <div className="tag-icon">
                                  <div className="tag-icon--bg"></div>
                                  <div className="tag-icon--heart"></div>
                                </div>
                                <span className="tag-icon--text">{tag.Name}</span>
                              </div>
                          </div>;
                  })
                  .value()
              }
          </div>
  }
});

module.exports = Tags;