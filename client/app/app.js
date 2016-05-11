import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/footer';
import LandingPage from './components/landing/landingPage';
import Dashboard from './components/dashboard/dashboard';

class App extends Component {
  constructor(props) {
    super(props);
    // set default state
    this.state = {
      loggedIn: false,
      page: 'dashboard',
      user: null,
    };

    this.login = this.login.bind(this);
  }

  login(user) {
    this.setState({
      loggedIn: true,
      user,
    });
  }

  render() {
    let pageLayout;
    if (this.state.loggedIn === false) {
      pageLayout = <div>
        <LandingPage login={this.login} />
      </div>
    }
    if (this.state.page === 'dashboard' && this.state.loggedIn === true) {
      pageLayout = <div>
        <Dashboard 
          handleSearchChange={this.handleSearchChange}
          handleSearchButtonClick={this.handleSearchButtonClick} 
        />
      </div>
    }
    if (this.state.page === 'profile' && this.state.loggedIn === true) {
      pageLayout = <div>
        <Profile />
      </div>
    }
    return (
      <div>
        <Header />
        {pageLayout}
        <Footer />
      </div>
    );
  }
}

export default App;

