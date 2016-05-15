import React from 'react';
import services from '../../services/services';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardText } from 'material-ui/Card';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      email: null,
      username: null,
      password: null,
    };

    this.handleInputName = this.handleInputName.bind(this);
    this.handleInputEmail = this.handleInputEmail.bind(this);
    this.handleInputUsername = this.handleInputUsername.bind(this);
    this.handleInputPassword = this.handleInputPassword.bind(this);
    this.handleSignUpData = this.handleSignUpData.bind(this);
  }

  handleSignUpData() {
    const user = {
      name: this.state.name,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    };
    services.auth('/signup', user, (res) => {
      if (res.status === 'SUCCESS') {
        return this.props.loginSuccess(user);
      }
      return this.props.signupFail();
    });
  }

  handleInputName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  handleInputEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  handleInputUsername(event) {
    this.setState({
      username: event.target.value,
    });
  }

  handleInputPassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Card
          style={{
            height: 400,
            width: 325,
            margin: '0 auto',
          }}
        >
          <CardText>
            <div className="form-group">
              <h2>signup</h2>
              <form
                id="signup"
              >
                <input
                  className="form-control"
                  id="name"
                  type="text"
                  onChange={this.handleInputName}
                  placeholder="enter your name..."
                />
                <input
                  className="form-control"
                  id="email"
                  type="text"
                  onChange={this.handleInputEmail}
                  placeholder="enter your email..."
                />
                <input
                  className="form-control"
                  id="username"
                  type="text"
                  onChange={this.handleInputUsername}
                  placeholder="choose a username..."
                />
                <input
                  className="form-control"
                  id="password"
                  type="password"
                  onChange={this.handleInputPassword}
                  placeholder="create a password..."
                />
                <br />
                <button type="button" onClick={this.handleSignUpData}>Submit!</button>
              </form>
            </div>
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

SignUp.propTypes = {
  loginSuccess: React.PropTypes.func,
  signupFail: React.PropTypes.func,
};


export default SignUp;
