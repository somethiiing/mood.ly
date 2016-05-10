import React, { Component } from 'react';
import wiki from './services/wiki.js';
import Search from './components/Search';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import gif from './services/giphy.js';

class App extends Component {
  constructor(props) {
    super(props);
    // set default state
    this.state = {
      currMood: '',
      currQuote: '',
      currentSearch: '',
      currentGif: '',
      showLogin: false,
      showSignUp: false,
    };

    this.onLoginClick = this.onLoginClick.bind(this);
    this.onSignUpClick = this.onSignUpClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
  }

  onSignUpClick() {
    this.setState({
      showSignUp: !this.state.showSignUp,
    });
  }

  onLoginClick() {
    this.setState({
      showLogin: !this.state.showLogin,
    });
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
    gif(query, (res) => {
      const randomIndex = Math.floor((Math.random() * res.length) + 1);
      self.setState({
        currentGif: res[randomIndex],
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
        <Header
          onSignUpClick={this.onSignUpClick}
          onLoginClick={this.onLoginClick}
        />
        <div>
          {this.state.showLogin ? <Login /> : null}
        </div>
        <div>
          {this.state.showSignUp ? <Signup /> : null}
        </div>
        <h1>mood.ly</h1>
        <Search
          handleSearchChange={this.handleSearchChange}
          handleSearchButtonClick={this.handleSearchButtonClick}
        />
        <div className="moodly-content">
          <span className="quote-title"><h2>{this.state.currQuote}</h2></span>
        </div>
        <img src={this.state.currentGif} alt="gif" />
      </div>
    );
  }
}

// App.propTypes = {
//   onSignUpClick: PropTypes.func.isRequired,
//   onLoginClick: PropTypes.func.isRequired,
//   handleSearchButtonClick: PropTypes.func.isRequired,
//   handleSearchChange: PropTypes.func.isRequired,
// };

export default App;
