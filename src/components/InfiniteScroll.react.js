var React = require('react'),
    InfiniteList = require('react-infinite-scroll')(React),
    api = require('../data/api'),
    _ = require('lodash'),
    tools = require('../utils/tools'),
    Link = require('react-router').Link;

var InfiniteScroll = React.createClass({
  
  getInitialState() {
    return {
      page: 1,
      hasMore: true,
      isLoading: false,
      piclist: []
    }
  },

  handleScroll(event) {
    if (!this.state.hasMore) {
      console.log("no more, will stop");
      window.removeEventListener('scroll', this.handleScroll);
    }

    var page_height = event.srcElement.body.scrollHeight,
        scroll_up = event.srcElement.body.scrollTop,
        screen_height = window.screen.height;

    var down_enough = (page_height - (scroll_up + screen_height) < 200);
    if (down_enough && !this.state.isLoading) {
      this._load_more_items();
    }

  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    var api_str = this.props.api || "hot_pics";

    if (api_str === "hot_pics") {
      api.hot_pics({page: 1, size: 9}).then(function(response) {
        if (this.isMounted()) {
          if (!response) return;
          var data = response.objects.data;
          this.setState({
            page: 2,
            piclist: data,
            isLoading: false
          });
        }
      }.bind(this));
    } else if (api_str === "personal") {

    }
  },

  _load_more_items() {
    if (!this.state.hasMore) return;

    this.setState({ isLoading: true });
    var current_page = this.state.page;
    api.hot_pics({page: current_page, size: 9}).then(function(response) {
      if (this.isMounted()) {
        if (!response) return;

        var currentPics = this.state.piclist;
        var data = response.objects.data;
        var hasmore = !(!data || data.length < 9);
        var new_piclist = _(currentPics).concat(data).value();

        this.setState({
          page: current_page + 1,
          piclist: new_piclist,
          isLoading: false,
          hasMore: hasmore
        });
      }
    }.bind(this));
  },

  render() {
    var pics = this.state.piclist;
    return (
      <div className="hot-pic">
        <div className="hot-pic__title"><h2>热门精选</h2></div>
        <ul className="infinite-pic__parent">
          {
            _.chain(pics)
            .uniq()
            .map(function(pic) {
              var pic_url = tools.get_image_url(pic.Image, pic.Type);
              return <li className="image-list__item pure-u-1-3">
                      <Link className="image-list__link" to="picshare" params={{uid: pic.AccountId, pid: pic.PictureId}}>
                        <img className="image-list__image" src={pic_url} alt="image" />
                      </Link>
                    </li>;
            })
            .value()
          }
          <li className="btn-loading">
            <button className="btn btn-primary btn-wide">加载中……</button>
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = InfiniteScroll;