import React from 'react';
import Header from './components/Header';
import Profile from './components/profile/Profile';
import LandingPage from './components/landing/landingPage';
import Dashboard from './components/dashboard/dashboard';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import D3PieChart from './components/d3/D3PieChart';
// import PieChart from './components/d3/PieChart';
import controller from './services/controllers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Dialog from 'material-ui/Dialog';
import Button from 'react-bootstrap/lib/Button';

class App extends React.Component {
  constructor(props) {
    super(props);
    // set default state
    this.state = {
      loggedIn: false,
      page: 'landing',
      user: { name: ' ', email: ' ', username: ' ', password: ' ' },
      failMessageDisplay: false,
      moodData: [],
      open: false,
    };


    this.logout = this.logout.bind(this);
    this.profile = this.profile.bind(this);
    this.dashboard = this.dashboard.bind(this);
    this.loginFail = this.loginFail.bind(this);
    this.signupFail = this.signupFail.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.loginSuccess = this.loginSuccess.bind(this);
    this.handleMoodData = this.handleMoodData.bind(this);
    this.invalidEmailAlert = this.invalidEmailAlert.bind(this);
    this.allFieldsRequiredAlert = this.allFieldsRequiredAlert.bind(this);
  }

// ERROR MESSAGE FUNCTIONS
// //////////////////////////////////

  loginFail() {
    this.setState({
      page: 'landing',
      failMessageDisplay: 'LOGINFAIL',
    });
    this.handleOpen();
  }

  signupFail() {
    this.setState({
      page: 'landing',
      failMessageDisplay: 'SIGNUPFAIL',
    });
    this.handleOpen();
  }

  allFieldsRequiredAlert() {
    this.setState({
      failMessageDisplay: 'FIELDSREQUIRED',
    });
    this.handleOpen();
  }

  invalidEmailAlert() {
    this.setState({
      failMessageDisplay: 'INVALIDEMAIL',
    });
    this.handleOpen();
  }

// NAVIGATION HANDLING FUNCTIONS
// //////////////////////////////////

  loginSuccess(user) {
    this.setState({
      user,
      loggedIn: true,
      page: 'dashboard',
    });
  }

  logout() {
    this.setState({
      user: { name: ' ', email: ' ', username: ' ', password: ' ' },
      page: 'landing',
      loggedIn: false,
      failMessageDisplay: false,
    });
  }

  profile() {
    if (this.state.loggedIn === false) {
      this.setState({
        failMessageDisplay: 'NOACCESS',
      });
      return this.handleOpen();
    }
    return this.setState({
      page: 'profile',
    });
  }

  dashboard() {
    if (this.state.loggedIn === false) {
      return this.setState({
        page: 'landing',
      });
    }
    return this.setState({
      page: 'dashboard',
    });
  }

  // Test addiding Pie Chart above Dashboard Component
  handleMoodData() {
    controller.getAllUserData('moods', this.state.user.name, data => {
      this.setState({ moodData: data });
    });
  }

  // componentWillMount() {
  //   this.handleMoodData();
  // }


// DIALOG BOX OPEN/CLOSE FUNCTIONS
// //////////////////////////////////

  handleOpen() {
    return this.setState({
      open: true,
    });
  }

  handleClose() {
    return this.setState({
      open: false,
    });
  }

  render() {
    const actions = [
      <Button
        bsSize="large"
        className="primary-button"
        onClick={this.handleClose}
      >
      OK
      </Button>,
    ];

    let pageLayout;
    let FailedLoginMessage;

    if (this.state.failMessageDisplay === 'LOGINFAIL') {
      FailedLoginMessage = 'Incorrect Username or Password. Please try again.';
    }
    if (this.state.failMessageDisplay === 'SIGNUPFAIL') {
      FailedLoginMessage = 'User already exists. Please try another name.';
    }
    if (this.state.failMessageDisplay === 'NOACCESS') {
      FailedLoginMessage = 'Please login first!';
    }
    if (this.state.failMessageDisplay === 'FIELDSREQUIRED') {
      FailedLoginMessage = 'All Fields Required!';
    }
    if (this.state.failMessageDisplay === 'INVALIDEMAIL') {
      FailedLoginMessage = 'Invalid E-mail, please use a different one!';
    }

    if (this.state.page === 'landing' && this.state.loggedIn === false) {
      pageLayout = (
        <div>
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Dialog
              actions={actions}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
            {FailedLoginMessage}
            </Dialog>
          </MuiThemeProvider>
          <LandingPage
            dashboard={this.dashboard}
            loginFail={this.loginFail}
            signupFail={this.signupFail}
            loginSuccess={this.loginSuccess}
            invalidEmailAlert={this.invalidEmailAlert}
            allFieldsRequiredAlert={this.allFieldsRequiredAlert}
          />
        </div>
      );
    }
    if (this.state.page === 'dashboard' && this.state.loggedIn === true) {
      pageLayout = (
        <div>
          <Header
            dashboard={this.dashboard}
            logout={this.logout}
            profile={this.profile}
            handleMoodData={this.handleMoodData}
          />
          <Dashboard
            user={this.state.user}
          />
        </div>
      );
    }
    if (this.state.page === 'profile' && this.state.loggedIn === true) {
      pageLayout = (
        <div>
          <Header
            dashboard={this.dashboard}
            logout={this.logout}
            profile={this.profile}
            handleMoodData={this.handleMoodData}
          />
          <Profile
            user={this.state.user}
            moodData={this.state.moodData}
          />
        </div>
      );
    }
    return (
      <div>
        {pageLayout}
      </div>
    );
  }
}

injectTapEventPlugin();

export default App;
