import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { signOut } from '../actions';
import GoogleAuth from './GoogleAuth';

class Navbar extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          BOOK STORE
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item ">
              <Link to="/cart/" className="nav-link">
                Shopping Cart
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/orders/" className="nav-link">
                Orders
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </li>
            <li class="nav-item">
              <GoogleAuth push={this.props.history.push} />
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     signOut: () => dispatch(signOut())
//   }
// }

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default compose(withRouter, connect(mapStateToProps))(Navbar);
