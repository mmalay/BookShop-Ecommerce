import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signOut, signIn } from '../actions';

class Profile extends Component {
  render() {
    return (
      <div className="container">
        <img
          src={this.props.user.image}
          className="img-fluid"
          alt="Responsive image"
        />
        <h1>Name: {this.props.user.name}</h1>
        <h1>Email Id: {this.props.user.email}</h1>
        <a>
          Add/Edit Address <i class="fas fa-edit"></i>
        </a>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.auth.user };
};

export default connect(mapStateToProps, { signIn, signOut })(Profile);
