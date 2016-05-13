import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Footer from './components/Footer';
// import Profile from './components/profile/Profile';
import LandingPage from './components/landing/landingPage';
import Dashboard from './components/dashboard/dashboard';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Profile from './components/profile/Profile';

class App extends Component {
  constructor(props) {
    super(props);
    // set default state
    this.state = {
      loggedIn: false,
      page: 'landing',
      user: null,
      failMessageDisplay: false,
    };

    this.logout = this.logout.bind(this);
    this.loginFail = this.loginFail.bind(this);
    this.signupFail = this.signupFail.bind(this);
    this.loginSuccess = this.loginSuccess.bind(this);
    this.profile = this.profile.bind(this);
  }

  loginFail() {
    if (this.state.failMessageDisplay === false) {
      this.setState({
        page: 'landing',
        failMessageDisplay: 'LOGINFAIL',
      });
    }
  }

  loginSuccess(user) {
    this.setState({
      page: 'dashboard',
      loggedIn: true,
      user,
    });
  }

  signupFail() {
    this.setState({
      page: 'landing',
      failMessageDisplay: 'SIGNUPFAIL',
    });
  }

  logout() {
    this.setState({
      page: 'landing',
      loggedIn: false,
    });
  }
  profile() {
    console.log('GO TO PROFILE PAGE');
    this.setState({
      page: 'profile',
    });
    console.log('PAGE: ', this.state.page);
    // ReactDOM.render(<App />);
  }

  render() {
    let FailedLoginMessage = <div> Please Login or Sign Up!</div>;
    if (this.state.failMessageDisplay === 'LOGINFAIL') {
      FailedLoginMessage = (<div>Incorrect Username or Password. Please try again.</div>);
    }
    if (this.state.failMessageDisplay === 'SIGNUPFAIL') {
      FailedLoginMessage = (<div>User already exists. Please try another name.</div>);
    }

    let pageLayout;

    if (this.state.page === 'landing' && this.state.loggedIn === false) {
      pageLayout = (
        <div>
          {FailedLoginMessage}
          <LandingPage
            loginSuccess={this.loginSuccess}
            loginFail={this.loginFail}
            signupFail={this.signupFail}
          />
        </div>
      );
    }
    if (this.state.page === 'dashboard' && this.state.loggedIn === true) {
      pageLayout = (
        <div>
          <Dashboard
            user={this.state.user}
          />
        </div>
      );
    }
    if (this.state.page === 'profile' && this.state.loggedIn === true) {
      pageLayout = (
        <div>
          <Profile user={this.state.user} />
        </div>
      );
    }
    return (
      <div>
        <Header
          logout={this.logout}
          profile={this.profile}
        />
        {pageLayout}
        <Footer />
      </div>
    );
  }
}

injectTapEventPlugin();

export default App;
