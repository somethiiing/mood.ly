import React from 'react';
import services from '../../services/services';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardText } from 'material-ui/Card';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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
            height: 450,
            width: 325,
            margin: '0 auto',
          }}
        >
          <CardText>
            <div className="form-group">
              <h2>signup</h2>
              <TextField
                className="form-control"
                id="name"
                onChange={this.handleInputName}
                floatingLabelText="enter your name:"
                floatingLabelFixed={Boolean(true)}
                fullWidth={Boolean(false)}
              />
              <TextField
                className="form-control"
                id="email"
                onChange={this.handleInputEmail}
                floatingLabelText="enter your email:"
                floatingLabelFixed={Boolean(true)}
                fullWidth={Boolean(false)}
              />
              <TextField
                className="form-control"
                id="username"
                onChange={this.handleInputUsername}
                floatingLabelText="choose a username:"
                floatingLabelFixed={Boolean(true)}
                fullWidth={Boolean(false)}
              />
              <TextField
                className="form-control"
                id="password"
                onChange={this.handleInputPassword}
                floatingLabelText="choose a password:"
                floatingLabelFixed={Boolean(true)}
                fullWidth={Boolean(false)}
              />
              <br />
              <br />
              <RaisedButton
                label="submit"
                onClick={this.handleSignUpData}
                primary={Boolean(true)}
              />
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
