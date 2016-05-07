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
  }

  onSignUpClick() {
    this.setState({
      showSignUp: !this.state.showSignUp,
    });
    this.onSignUpClick = this.onSignUpClick.bind(this);
  }

  onLoginClick() {
    this.setState({
      showLogin: !this.state.showLogin,
    });
    this.onLoginClick = this.onLoginClick.bind(this);
  }

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
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
  }

  handleSearchChange(event) {
    this.setState({
      currentSearch: event.target.value,
    });
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  render() {
    return (
      <div>
        <div>
          <Header
            onSignUpClick={this.onSignUpClick.bind(this)}
            onLoginClick={this.onLoginClick.bind(this)}
          />
        </div>
        <div>
          {this.state.showLogin ? <Login /> : null}
        </div>
        <div>
          {this.state.showSignUp ? <Signup /> : null}
        </div>
        <h1>mood.ly</h1>
        <Nav
          handleSearchChange={this.handleSearchChange.bind(this)}
          handleSearchButtonClick={this.handleSearchButtonClick.bind(this)}
        />
        <div className="moodly-content">
          <span className="quote-title"><h2>{this.state.currQuote}</h2></span>
        </div>
      </div>
    );
  }
}

// App.propTypes = {
//   onSignUpClick: React.propTypes.func.isRequired,
//   onLoginClick: React.propTypes.func.isRequired,
//   handleSearchButtonClick: React.propTypes.func.isRequired,
//   handleSearchChange: React.propTypes.func.isRequired,
// };

export default App;

// <Login onLoginClick={this.onLoginClick.bind(this)} />
