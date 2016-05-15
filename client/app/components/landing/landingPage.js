import React from 'react';
import Login from './login';
import SignUp from './signup';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="landing-content">
        <Grid>
          <Row className="show-grid">
            <Col md={6}>
              <Login
                loginSuccess={this.props.loginSuccess}
                loginFail={this.props.loginFail}
              />
            </Col>
            <Col md={6}>
              <SignUp
                loginSuccess={this.props.loginSuccess}
                signupFail={this.props.signupFail}
              />
            </Col>
          </Row>
        </Grid>
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
