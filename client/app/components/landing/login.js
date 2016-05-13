import React from 'react';
import auth from '../../services/auth';

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
    auth.login(user, (res) => {
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
              className="form-control" id="username"
              type="text" placeholder="enter your username..."
              onChange={this.handleInputUsername}
            />
            <br />
            <label htmlFor="password"></label>
            <input
              className="form-control" id="password"
              type="password" placeholder="enter your password..."
              onChange={this.handleInputPassword}
            />
            <br />
            <br />
            <button type="button" onClick={this.handleLoginData}>Submit</button>
          </form>
        </div>
        <div className="auth-buttons">
          <a href="/auth/facebook">
            <i className="fa fa-facebook-official fa-2x" aria-hidden="true"></i>
          </a>
          <a href="/auth/google">
            <i className="fa fa-google fa-2x" aria-hidden="true"></i>
          </a>
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
