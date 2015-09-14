var React = require('react'),
    api = require('../data/api'),
    _ = require('lodash'),
    tools = require('../utils/tools'),
    Link = require('react-router').Link;

var PAGE_COUNT = 9;

var InfiniteScroll = React.createClass({
  
  getInitialState() {
    return {
      page: 1,
      hasMore: true,
      isLoading: false,
      loadClass: "btn-loading",
      piclist: []
    }
  },

  getDefaultProps() {
    return {
      api: "hot_pics",
      uid: 0
    }
  },

  _get_pics() {
    var api_str = this.props.api || "hot_pics";
    var current_page = this.state.page;

    if (api_str === "hot_pics") {
      api.hot_pics({page: current_page, size: PAGE_COUNT}).then(function(response) {
        if (this.isMounted()) {
          if (!response) return;
          var currentPics = this.state.piclist;
          var data = response.objects.data;
          var hasmore = !(!data || data.length < PAGE_COUNT);
          var new_piclist = _(currentPics).concat(data).value();
          
          this.setState({
            page: current_page + 1,
            piclist: new_piclist,
            isLoading: false,
            loadClass: "btn-loading",
            hasMore: hasmore
          });
        }
      }.bind(this));
    } else if (api_str === "personal") {
      api.user_data({id: this.props.uid, type: 0, page: current_page, size: PAGE_COUNT}).then(function(response) {
        if (this.isMounted()) {
          if (!response) return;
          
          var currentPics = this.state.piclist;
          var data = response.objects.data.PicList;
          var hasmore = !(!data || data.length < PAGE_COUNT);
          var new_piclist = _(currentPics).concat(data).value();

          this.setState({
            page: current_page + 1,
            piclist: new_piclist,
            isLoading: false,
            loadClass: "btn-loading",
            hasMore: hasmore
          });
        }
      }.bind(this));
    }
  },

  handleScroll(event) {
    if (!this.state.hasMore) {
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

    if (!this.state.isLoading) {
      this.setState({ isLoading: true, loadClass: "btn-loading btn-loading__show"});
      this._get_pics();
    }
  },

  _load_more_items() {
    if (!this.state.hasMore) return;
    this.setState({ isLoading: true, loadClass: "btn-loading btn-loading__show"});
    this._get_pics();
  },

  _show_heading() {
    if (this.props.api === "hot_pics") {
      return <div className="hot-pic__title"><h2>热门精选</h2></div>
    }
  },

  render() {
    var pics = this.state.piclist,
        api_str = this.props.api,
        prop_uid = this.props.uid;
    return (
      <div className="hot-pic">
        {this._show_heading()}
        <ul className="infinite-pic__parent">
          {
            _.chain(pics)
            .uniq()
            .map(function(pic) {
              var pic_url = tools.get_image_url(pic.Image, pic.Type);

              var userId = (api_str === "hot_pics") ? pic.AccountId : prop_uid,
                  picId = (api_str === "hot_pics") ? pic.PictureId : pic.PicId;

              var pic_type = (pic.Type === 2) ? "image-list__link image--gif" : "image-list__link";

              return <li className="image-list__item pure-u-1-3">
                      <Link className={pic_type} to="picshare" params={{uid: userId, pid: picId}}>
                        <img className="image-list__image image" src={pic_url} alt="image" />
                      </Link>
                    </li>;
            })
            .value()
          }
          <li className={this.state.loadClass}>
            <button className="btn btn-primary btn-wide">加载中……</button>
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = InfiniteScroll;