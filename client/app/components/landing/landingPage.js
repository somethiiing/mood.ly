import React from 'react';
import Login from './login';
import SignUp from './signup';
import About from './about';
import Title from './title';
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
      <div>
        <Title
          dashboard={this.props.dashboard}
        />
        <About />
        <Grid>
          <Row className="show-grid landing-content" id="signin">
            <h2>get started</h2>
            <Col md={1} />
            <Col md={5} className="card-spacing">
              <Login
                loginSuccess={this.props.loginSuccess}
                loginFail={this.props.loginFail}
              />
            </Col>
            <Col md={5} className="card-spacing">
              <SignUp
                signupFail={this.props.signupFail}
                loginSuccess={this.props.loginSuccess}
                invalidEmailAlert={this.props.invalidEmailAlert}
                allFieldsRequiredAlert={this.props.allFieldsRequiredAlert}
              />
            </Col>
            <Col md={1} />
          </Row>
        </Grid>
        <footer className="landing-footer">
          <div className="container">
            <ul className="social-buttons">
              <a href="#"><i className="fa fa-facebook fa-2x" aria-hidden="true"></i></a>
              <a href="#"><i className="fa fa-twitter fa-2x" aria-hidden="true"></i></a>
              <a href="#"><i className="fa fa-soundcloud fa-2x" aria-hidden="true"></i></a>
            </ul>
          </div>
        </footer>
      </div>
    );
  }
}

LandingPage.propTypes = {
  dashboard: React.PropTypes.func,
  loginFail: React.PropTypes.func,
  signupFail: React.PropTypes.func,
  loginSuccess: React.PropTypes.func,
  invalidEmailAlert: React.PropTypes.func,
  allFieldsRequiredAlert: React.PropTypes.func,
};

export default LandingPage;
