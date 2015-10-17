var React = require('react'),
    _ = require('lodash'),
    Link = require('react-router').Link;

var Tags = React.createClass({

  getDefaultProps() {
    return {
      taglist: []
    }
  },

  render() {
    var taglist = this.props.taglist || [];
    return <div className="pic-share__tags">
              {
                _.chain(taglist)
                  .uniq()
                  .map(function(tag) {
                    if (!tag) return;
                    var tag_style = "pic-share__tag-item ";
                    tag_style += (tag.P == 1) ? " tag--left" : " tag--right";
                    var pos = {"left": tag.X, "top": tag.Y};
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