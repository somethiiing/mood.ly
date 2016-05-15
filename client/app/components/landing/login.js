import React from 'react';
import services from '../../services/services';

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
      <div className="login-content">
        <h1>login</h1>
        <div className="form-group">
          <form
            id="login" className="login-form"
          >
            <label htmlFor="username"></label>
            <input
              className="form-control"
              id="username"
              type="text"
              placeholder="enter your username..."
              onChange={this.handleInputUsername}
            />
            <label htmlFor="password"></label>
            <input
              className="form-control"
              id="password"
              type="password"
              placeholder="enter your password..."
              onChange={this.handleInputPassword}
            />
            <br />
            <button type="button" onClick={this.handleLoginData}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginSuccess: React.PropTypes.func,
  loginFail: React.PropTypes.func,
};

export default Login;
