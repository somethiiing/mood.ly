import React from 'react';
import Login from './login';
import SignUp from './signup';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="landing-content">
        <Login
          loginSuccess={this.props.loginSuccess}
          loginFail={this.props.loginFail}
        />
        <SignUp
          loginSuccess={this.props.loginSuccess}
          signupFail={this.props.signupFail}
        />
      </div>
    );
  }
}

LandingPage.propTypes = {
  loginSuccess: React.PropTypes.func,
  loginFail: React.PropTypes.func,
  signupFail: React.PropTypes.func,
};

export default LandingPage;
