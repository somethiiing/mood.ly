import React from 'react';
import services from '../../services/services';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardText } from 'material-ui/Card';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

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
      if (res.status === 'SUCCESS') {
        console.log('status', res.status);
        return this.props.loginSuccess(user);
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
            height: 400,
            width: 300,
            margin: '0 auto',
          }}
        >
          <CardText>
            <div className="form-group">
              <h2>login</h2>
              <form
                id="login"
              >
                <input
                  className="form-control"
                  id="username"
                  type="text"
                  placeholder="enter your username..."
                  onChange={this.handleInputUsername}
                />
                <input
                  className="form-control"
                  id="password"
                  type="password"
                  placeholder="enter your password..."
                  onChange={this.handleInputPassword}
                />
                <button type="button" onClick={this.handleLoginData}>Submit</button>
              </form>
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
