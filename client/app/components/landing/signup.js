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
      name: '',
      email: '',
      username: '',
      password: '',
    };

    this.handleInputName = this.handleInputName.bind(this);
    this.handleInputEmail = this.handleInputEmail.bind(this);
    this.handleSignUpData = this.handleSignUpData.bind(this);
    this.handleInputUsername = this.handleInputUsername.bind(this);
    this.handleInputPassword = this.handleInputPassword.bind(this);
  }

  handleSignUpData() {
    const user = {
      name: this.state.name,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    };

    const emailCheck = email => {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
    };

    if (this.state.name.length === 0 || 
      this.state.username.length === 0 || this.state.password.length === 0) {
      return this.props.allFieldsRequiredAlert();
    }
    if (emailCheck(this.state.email) === false) {
      return this.props.invalidEmailAlert();
    }
    return services.auth('/signup', user, res => {
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
                type="password"
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
  signupFail: React.PropTypes.func,
  loginSuccess: React.PropTypes.func,
  invalidEmailAlert: React.PropTypes.func,
  allFieldsRequiredAlert: React.PropTypes.func,
};


export default SignUp;
