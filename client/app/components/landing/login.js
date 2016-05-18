import React from 'react';
import services from '../../services/services';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Button from 'react-bootstrap/lib/Button';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
    };

    this.handleInputUsername = this.handleInputUsername.bind(this);
    this.handleInputPassword = this.handleInputPassword.bind(this);
    this.handleLoginData = this.handleLoginData.bind(this);
  }

  handleLoginData() {
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    services.auth('/login', user, (res) => {
      if (res.success === true) {
        return this.props.loginSuccess(res.body);
      }
      return this.props.loginFail();
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
            border: '4px solid #424242',
            borderRadius: '25px',
            boxShadow: 'none',
          }}
        >
          <CardText>
            <div className="form-group">
              <h3>login</h3>
              <TextField
                className="form-control"
                id="username"
                floatingLabelText="enter your username:"
                floatingLabelFixed={Boolean(true)}
                fullWidth={Boolean(false)}
                onChange={this.handleInputUsername}
                floatingLabelStyle={{
                  color: '#424242',
                }}
                underlineStyle={{
                  borderColor: '#424242',
                  borderWidth: 2,
                }}
                underlineFocusStyle={{
                  borderColor: '#bfefff',
                  borderWidth: 2,
                }}
              />
              <TextField
                className="form-control"
                id="password"
                type="password"
                floatingLabelText="enter your password:"
                floatingLabelFixed={Boolean(true)}
                onChange={this.handleInputPassword}
                floatingLabelStyle={{
                  color: '#424242',
                }}
                underlineStyle={{
                  borderColor: '#424242',
                  borderWidth: 2,
                }}
                underlineFocusStyle={{
                  borderColor: '#bfefff',
                  borderWidth: 2,
                }}
              />
              <br />
              <br />
              <Button
                bsSize="large"
                className="primary-button"
                onClick={this.handleLoginData}
              >
              submit
              </Button>
            </div>
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

Login.propTypes = {
  loginSuccess: React.PropTypes.func,
  loginFail: React.PropTypes.func,
};

export default Login;
