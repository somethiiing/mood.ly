import React, { Component } from 'react';
import wiki from './services/wiki.js';
import Nav from './components/Nav';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';

class App extends Component {
  constructor(props) {
    super(props);
    // set default state
    this.state = {
      currMood: '',
      currQuote: '',
      currentSearch: '',
      showLogin: false,
      showSignUp: false,
    };

    this.onLoginClick = this.onLoginClick.bind(this);
    this.onSignUpClick = this.onSignUpClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
  }

  // onSignUpClick() {
  //   this.setState({
  //     showSignUp: !this.state.showSignUp,
  //   });
  // }

  // onLoginClick() {
  //   this.setState({
  //     showLogin: !this.state.showLogin,
  //   });
  // }

  handleSearchButtonClick() {
    const self = this;
    const query = this.state.currentSearch;
    wiki(query, (res) => {
      const randomIndex = Math.floor((Math.random() * res.length) + 1);
      self.setState({
        currMood: query,
        currQuote: res[randomIndex],
      });
    });
  }

  handleSearchChange(event) {
    this.setState({
      currentSearch: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          {this.state.showLogin ? <Login /> : null}
        </div>
        <div>
          {this.state.showSignUp ? <Signup /> : null}
        </div>
        <h1>mood.ly</h1>
        <Nav
          handleSearchChange={this.handleSearchChange}
          handleSearchButtonClick={this.handleSearchButtonClick}
        />
        <div className="moodly-content">
          <span className="quote-title"><h2>{this.state.currQuote}</h2></span>
        </div>
      </div>
    );
  }
}

export default App;
