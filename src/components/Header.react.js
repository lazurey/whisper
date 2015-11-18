import React from 'react'
import { Link } from 'react-router'

const Header = React.createClass({
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li>
            <Link className="logo" title="Home" to="/">
              <img src="assets/images/kizz-logo.png" alt="kizz" />
            </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
});

module.exports = Header;