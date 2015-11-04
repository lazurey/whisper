var React = require('react'),
    _ = require('lodash'),
    Link = require('react-router').Link;

var changeDate = new Date(2015, 9, 31);

var Tags = React.createClass({

  getDefaultProps() {
    return {
      taglist: [],
      date: "20151101"
    }
  },

  _checkDate(dateStr) {
    var year = parseInt(dateStr.slice(0, 4)),
        month = parseInt(dateStr.slice(4, 6)) - 1,
        day = parseInt(dateStr.slice(6, 8));
    var createDate = new Date(year, month, day);
    return (createDate > changeDate);
  },

  _getPosition(x, y) {
    if (this._checkDate(this.props.date)) {
      // use new position
      x = screen.width / x;
      y = screen.width / y;
    }
    return {"left": x, "top": y};
  },

  // componentDidMount() {
  //   console.log(this.props.date, " this is did mount");
  // },

  render() {
    var taglist = this.props.taglist || [];
    // console.log(taglist);
    var that = this;
    return <div className="pic-share__tags">
              {
                _.chain(taglist)
                  .uniq()
                  .map(function(tag) {
                    if (!tag) return;
                    var tag_style = "pic-share__tag-item ";
                    tag_style += (tag.P == 1) ? " tag--left" : " tag--right";
                    // var pos = {"left": tag.X, "top": tag.Y};
                    var pos = that._getPosition(tag.X, tag.Y);
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