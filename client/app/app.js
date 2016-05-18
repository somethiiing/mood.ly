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
    this.loginSuccess = this.loginSuccess.bind(this);
    this.handleMoodData = this.handleMoodData.bind(this);
    this.invalidEmailAlert = this.invalidEmailAlert.bind(this);
    this.allFieldsRequiredAlert = this.allFieldsRequiredAlert.bind(this);
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
      user,
      loggedIn: true,
      page: 'dashboard',
    });
  }

  signupFail() {
    console.log('fail');
    this.setState({
      page: 'landing',
      failMessageDisplay: 'SIGNUPFAIL',
    });
  }

  allFieldsRequiredAlert() {
    this.setState({
      failMessageDisplay: 'FIELDSREQUIRED',
    });
  }

  invalidEmailAlert() {
    this.setState({
      failMessageDisplay: 'INVALIDEMAIL',
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
      return this.setState({
        failMessageDisplay: 'NOACCESS',
      });
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
    let FailedLoginMessage;
    if (this.state.failMessageDisplay === 'LOGINFAIL') {
      FailedLoginMessage = (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
          Incorrect Username or Password. Please try again.
          </Dialog>
        </MuiThemeProvider>
      );
    }
    if (this.state.failMessageDisplay === 'SIGNUPFAIL') {
      FailedLoginMessage = (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
          User already exists. Please try another name.
          </Dialog>
        </MuiThemeProvider>
      );
    }
    if (this.state.failMessageDisplay === 'NOACCESS') {
      FailedLoginMessage = (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
          Please login first!
          </Dialog>
        </MuiThemeProvider>
      );
    }
    if (this.state.failMessageDisplay === 'FIELDSREQUIRED') {
      FailedLoginMessage = (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
          All Fields Required!
          </Dialog>
        </MuiThemeProvider>
      );
    }
    if (this.state.failMessageDisplay === 'INVALIDEMAIL') {
      FailedLoginMessage = (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
          Invalid E-mail, please use a different one!
          </Dialog>
        </MuiThemeProvider>
      );
    }

    let pageLayout;

    if (this.state.page === 'landing' && this.state.loggedIn === false) {
      pageLayout = (
        <div>
          {FailedLoginMessage}
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
