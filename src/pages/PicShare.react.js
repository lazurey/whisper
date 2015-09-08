var React = require('react'),
    Footer = require('../components/Footer.react'),
    Link = require('react-router').Link;

var PicShare = React.createClass({
  statics: {
    routeName: 'PicShare'
  },

  getDefaultProps() {
    return {
      routeName: 'PicShare'
    }
  },

  render() {
    return (
      <div className="container">
        <div className="main">
          <div className="pic-share__head--simple">
            <div className="pic-share__avatar">
              <img src="assets/images/example.jpg" alt="avatar" />
            </div>
            <div className="pic-share__info">
              <h3>Bluef</h3>
              <div className="pic-share__times">被啵<span>3</span>次</div>
            </div>
            <div className="pic-share__follow">
              <button className="btn btn-primary">+ 关注</button>
            </div>
          </div>
          <div className="pic-share__pic">
            <img src="assets/images/example.jpg" alt="image" />
          </div>
          <div className="pic-share__share pure-g">
            <div className="pure-u-4-24">啵</div>
            <div className="pure-u-16-24">
              <ul>
                <li>
                  <img src="assets/images/example.jpg" alt="userA" />
                </li>
              </ul>
            </div>
            <div className="pure-u-4-24">3</div>
          </div>
          <div className="pic-share__comment">
            <ul>
              <li className="pic-share__comment-item">
                <p>
                  <span className="comment__user">村口王师傅</span>:
                  <span className="comment__content">你好，烫头五块钱。</span>
                </p>
              </li>
              <li className="pic-share__comment-item">
                <p>
                  <span className="comment__user">村口王师傅</span>:
                  <span className="comment__content">你好，烫头五块钱。</span>
                </p>
              </li>
              <li className="pic-share__comment-item">
                <p>
                  <span className="comment__user">村口王师傅</span>:
                  <span className="comment__content">你好，烫头五块钱。</span>
                </p>
              </li>
              <li className="pic-share__comment-item">
                <p>
                  <span className="comment__user">村口王师傅</span>:
                  <span className="comment__content">你好，烫头五块钱。</span>
                </p>
              </li>
            </ul>
          </div>
          <div className="hot-pic">
            <h2>热门</h2>
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
          </div>
        </div>
        <Footer />
      </div>
    );
  }
});

module.exports = PicShare;
