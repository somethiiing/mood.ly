import React from 'react';
import auth from '../auth/auth.js';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      email: null,
      username: null,
      password: null,
      signUpData: {},
    };

    this.handleInputName = this.handleInputName.bind(this);
    this.handleInputEmail = this.handleInputEmail.bind(this);
    this.handleInputUsername = this.handleInputUsername.bind(this);
    this.handleInputPassword = this.handleInputPassword.bind(this);
    this.handleSignUpData = this.handleSignUpData.bind(this);
  }

  handleSignUpData(event) {
    event.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    };
    this.setState({
      signUpData: {
        name: this.state.name,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      },
    });
    console.log(user);
    auth.signup(user, (res) => {
      console.log('success!!', res);
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
      <div className="sign-up-content">
        <h1>sign up</h1>
        <div className="form-group">
          <form
            id="signup" className="signup-form"
          >
            <label htmlFor="name"></label>
            <input
              className="form-control" id="name"
              type="text" onChange={this.handleInputName}
              placeholder="enter your name..."
            />
            <br />
            <label htmlFor="email"></label>
            <input
              className="form-control" id="email"
              type="text" onChange={this.handleInputEmail}
              placeholder="enter your email..."
            />
            <br />
            <label htmlFor="username"></label>
            <input
              className="form-control" id="username"
              type="text" onChange={this.handleInputUsername}
              placeholder="choose a username..."
            />
            <br />
            <label htmlFor="password"></label>
            <input
              className="form-control" id="password"
              type="password" onChange={this.handleInputPassword}
              placeholder="create a password..."
            />
            <br />
            <br />
            <button type="button" onClick={this.handleSignUpData}>Submit!</button>
          </form>
        </div>
      </div>
    );
  }
}

// SignUp.propTypes = {
//   handleInputName: React.PropTypes.func,
//   handleInputEmail: React.PropTypes.func,
//   handleInputUsername: React.PropTypes.func,
//   handleInputPassword: React.PropTypes.func,
//   handleSignUpData: React.PropTypes.func,
// };

export default SignUp;
