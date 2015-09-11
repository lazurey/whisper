var React = require('react'),
    api = require('../data/api'),
    _ = require('lodash'),
    Link = require('react-router').Link;

var Comment = React.createClass({
  
  getInitialState() {
    return {
      piclist: []
    }
  },

  componentDidMount() {
    console.log(this.props.api);
    var api_str = this.props.api || "hot_pics";

    if (api_str === "hot_pics") {
      api.hot_pics({page: 1, size: 9}).then(function(response) {
        if (this.isMounted()) {
          if (!response) return;
          var data = response.objects.data;
          this.setState({
            piclist: data
          });
        }
      }.bind(this));
    } else if (api_str === "personal") {
      
    }


  },

  render() {
    var pics = this.state.piclist;
    return (
      <ul>
        {
          _.chain(pics)
            .uniq()
            .map(function(pic) {
              var pic_url = IMAGE_BASE_URL + pic.Image;
              return <li className="image-list__item pure-u-1-3">
                      <Link className="image-list__link" to="picshare" params={{uid: pic.AccountId, pid: pic.PictureId}}>
                        <img className="image-list__image" src={pic_url} alt="image" />
                      </Link>
                    </li>;
            })
            .value()
        }
      </ul>
    );
  }
});

module.exports = Comment;