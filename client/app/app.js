import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/landingPage';
import Dashboard from './components/Dashboard';


class App extends Component {
  constructor(props) {
    super(props);
    // set default state
    this.state = {
      loggedIn: true,
      page: 'dashboard',
    };
  }

  render() {
    let pageLayout;
    if (this.state.loggedIn === false) {
      pageLayout = <div>
        <LandingPage />
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

