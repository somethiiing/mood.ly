import React, { PropTypes, Component } from 'react';
import Login from './Login';
import Signup from './Signup';

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="landing-content">
        <Login />
        <Signup />
      </div>
    );
  }
}

LandingPage.propTypes = {
  // onLoginClick: PropTypes.func.isRequired,
  // onSignUpClick: PropTypes.func.isRequired,
};

export default LandingPage;