var React = require('react'),
    Header = require('../components/Header.react'),
    Footer = require('../components/Footer.react'),
    Link = require('react-router').Link;

var Home = React.createClass({
  statics: {
    routeName: 'Home'
  },

  getDefaultProps() {
    return {
      routeName: 'Home'
    }
  },

  render() {
    return (
      <div block={this.$$block} className='container'>
        <Header />
        <div className="main">
          <div className="personal-page__header pure-g">
            <div className="personal-page__header-avatar pure-u-6-24">
              <img src="assets/images/k-logo.png" alt="avatar" />
            </div>
            <div className="pure-u-12-24">
              <ul className="pure-g">
                <li className="personal-page__header-data pure-u-1-3">
                  <label>被啵</label>
                  <span>1234</span>
                </li>
                <li className="personal-page__header-data pure-u-1-3">
                  <label>被啵</label>
                  <span>1234</span>
                </li>
                <li className="personal-page__header-data pure-u-1-3">
                  <label>被啵</label>
                  <span>1234</span>
                </li>
                <li className="personal-page__header-detail pure-u-3-3">
                  <p>女，上海 浦东新区</p>
                </li>
              </ul>
            </div>
            <div className="pure-u-6-24">
              <Link className="btn btn-primary" to="/">编辑资料</Link>
            </div>
          </div>
          <ul className="personal-page__tab-tab">
            <li><span data-for="tab-9-grid">img</span></li>
            <li><span data-for="tab-tags">tag</span></li>
          </ul>
          <ul className="personal-page__tab-content">
            <li id="tab-9-grid">
            </li>
            <li id="tab-tags">
              <ul className="image-list">
                <li className="image-list__item pure-u-1-3">
                  <Link className="image-list__link" to="/">
                    <img className="image-list__image" src="assets/images/example.jpg" alt="image" />
                  </Link>
                </li>
                <li className="image-list__item pure-u-1-3">
                  <Link className="image-list__link" to="/">
                    <img className="image-list__image" src="assets/images/example.jpg" alt="image" />
                  </Link>
                </li>
                <li className="image-list__item pure-u-1-3">
                  <Link className="image-list__link" to="/">
                    <img className="image-list__image" src="assets/images/example.jpg" alt="image" />
                  </Link>
                </li>
                <li className="image-list__item pure-u-1-3">
                  <Link className="image-list__link" to="/">
                    <img className="image-list__image" src="assets/images/example.jpg" alt="image" />
                  </Link>
                </li>
                <li className="image-list__item pure-u-1-3">
                  <Link className="image-list__link" to="/">
                    <img className="image-list__image" src="assets/images/example.jpg" alt="image" />
                  </Link>
                </li>
                <li className="image-list__item pure-u-1-3">
                  <Link className="image-list__link" to="/">
                    <img className="image-list__image" src="assets/images/example.jpg" alt="image" />
                  </Link>
                </li>
                <li className="image-list__item pure-u-1-3">
                  <Link className="image-list__link" to="/">
                    <img className="image-list__image" src="assets/images/example.jpg" alt="image" />
                  </Link>
                </li>
                <li className="image-list__item pure-u-1-3">
                  <Link className="image-list__link" to="/">
                    <img className="image-list__image" src="assets/images/example.jpg" alt="image" />
                  </Link>
                </li>
                <li className="image-list__item pure-u-1-3">
                  <Link className="image-list__link" to="/">
                    <img className="image-list__image" src="assets/images/example.jpg" alt="image" />
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <Footer />
      </div>
    );
  }
});

module.exports = Home;
