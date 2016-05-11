import React, { PropTypes, Component } from 'react';
import Login from './login';
import SignUp from './signup';

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="landing-content">
        <Login />
        <SignUp />
      </div>
    );
  }
}

LandingPage.propTypes = {
  // onLoginClick: PropTypes.func.isRequired,
  // onSignUpClick: PropTypes.func.isRequired,
};

export default LandingPage;