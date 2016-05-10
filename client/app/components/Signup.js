import React, { PropTypes, Component } from 'react';

class SignUp extends Component {
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
    this.setState({
      signUpData: {
        name: this.state.name,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      },
    });
    console.log('signUpData ', this.signUpData);
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
            method="POST"
            onSubmit={this.props.handleSignUpData}
          >
            <label htmlFor="name"></label>
            <input
              className="form-control" id="name"
              type="text" onChange={this.props.handleInputName}
              placeholder="enter your name..."
            />
            <br />
            <label htmlFor="email"></label>
            <input
              className="form-control" id="email"
              type="text" onChange={this.props.handleInputEmail}
              placeholder="enter your email..."
            />
            <br />
            <label htmlFor="username"></label>
            <input
              className="form-control" id="username"
              type="text" onChange={this.props.handleInputUsername}
              placeholder="choose a username..."
            />
            <br />
            <label htmlFor="password"></label>
            <input
              className="form-control" id="password"
              type="password" onChange={this.props.handleInputName}
              placeholder="create a password..."
            />
            <br />
            <br />
            <button href="#" type="submit" value="submit">submit</button>
          </form>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  handleInputName: PropTypes.func,
  handleInputEmail: PropTypes.func,
  handleInputUsername: PropTypes.func,
  handleInputPassword: PropTypes.func,
  handleSignUpData: PropTypes.func,
};

export default SignUp;
