var React = require('react'),
    api = require('../data/api'),
    _ = require('lodash'),
    Link = require('react-router').Link;

var IMAGE_BASE_URL = "http://7xkvcu.com1.z0.glb.clouddn.com/";

var InfiniteScroll = React.createClass({
  
  getInitialState() {
    return {
      uid: "",
      piclist: []
    }
  },

  componentDidMount() {
    console.log(this.props.api);
    var api_str = this.props.api || "hot_pics";

    api.hot_pics({page: 1, size: 9}).then(function(response) {

      if (this.isMounted()) {
        if (!response) return;
        
        var data = response.objects.data;
        console.log(data);

        this.setState({
          uid: data.AccountId,
          piclist: data
        });
      }
    }.bind(this));

  },

  render() {
    var uid = this.state.AccountId
    var pics = this.state.piclist;
    return (
      <ul>
        {
          _.chain(pics)
            .uniq()
            .map(function(pic) {
              var pic_share_path = "/share/" + uid + "/" + pic.PictureId;
              var pic_url = IMAGE_BASE_URL + pic.Image;
              return <li className="image-list__item pure-u-1-3">
                      <Link className="image-list__link" to={pic_share_path}>
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

module.exports = InfiniteScroll;