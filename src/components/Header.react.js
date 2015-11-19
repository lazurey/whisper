import React, { Component } from 'react'
import { Link } from 'react-router'


export default class Header extends Component {
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
}
