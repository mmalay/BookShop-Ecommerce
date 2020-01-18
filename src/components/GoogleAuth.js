import React from 'react';
import { connect } from 'react-redux';
import { signOut, signIn } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '165211569240-f9mpek2dgvuvdfqitma0hp65a0b3nrkp.apps.googleusercontent.com',
          scope: 'profile email',
          fetch_basic_profile: true
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }
  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      const user = {
        name: this.auth.currentUser.Aia.value.w3.ig,
        email: this.auth.currentUser.Aia.value.w3.U3,
        image: this.auth.currentUser.Aia.value.w3.Paa
      };
      this.props.signIn(user);
    } else {
      this.props.signOut();
    }
  };

  onSignIn = () => {
    this.auth.signIn();
  };

  onSignOut = () => {
    this.auth.signOut();
    this.props.push(`/`);
  };

  renderAuthButton = () => {
    if (this.props.isSignedIn === null) {
      return <div>I dont know</div>;
    } else if (this.props.isSignedIn) {
      return (
        <div
          onClick={this.onSignOut}
          className="nav-link"
          style={{ cursor: 'pointer' }}
        >
          Sign Out
        </div>
      );
    } else {
      return (
        <div
          onClick={this.onSignIn}
          className="nav-link"
          style={{ cursor: 'pointer' }}
        >
          Sign In
        </div>
      );
    }
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
