import React from 'react';
import Login from './login';
import SignUp from './signup';
import Footer from '../Footer';
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
            <Col md={6} className="card-spacing">
              <Login
                loginSuccess={this.props.loginSuccess}
                loginFail={this.props.loginFail}
              />
            </Col>
            <Col md={6} className="card-spacing">
              <SignUp
                signupFail={this.props.signupFail}
                loginSuccess={this.props.loginSuccess}
                invalidEmailAlert={this.props.invalidEmailAlert}
                allFieldsRequiredAlert={this.props.allFieldsRequiredAlert}
              />
            </Col>
          </Row>
        </Grid>
        <Footer />
      </div>
    );
  }
}

LandingPage.propTypes = {
  loginFail: React.PropTypes.func,
  signupFail: React.PropTypes.func,
  loginSuccess: React.PropTypes.func,
  invalidEmailAlert: React.PropTypes.func,
  allFieldsRequiredAlert: React.PropTypes.func,
};

export default LandingPage;
