import React, { PropTypes, Component } from 'react';
import wiki from './services/wiki.js';
import $ from 'jquery';
import Nav from './components/Nav';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';

class App extends Component {
  constructor(props) {
    super(props);

    // searchData -- are we going to have search or dropdown?
      // this.debouncedSearch = _.debouce(searchData, 500, { leading: true }
      // );

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
      console.log('signup function fired');
      this.setState({
        showSignUp: !this.state.showSignUp,
      });
    }

    onLoginClick() {
      console.log('login function fired');
      this.setState({
        showLogin: !this.state.showLogin,
      });
    }

    handleSearchButtonClick() {
      var self = this;
      let query = this.state.currentSearch;
      console.log(query);
      wiki(query, function (res) {
       var randomIndex = Math.floor((Math.random()*res.length) + 1) ;
       console.log(randomIndex); 
        self.setState({
          currMood: query,
          currQuote: res[randomIndex]
        });
      });
    }

    handleSearchChange(event) {
      this.setState({
        currentSearch: event.target.value
      });
    }

    render() {
      return (
        <div>
          <div>
            <Header onSignUpClick={this.onSignUpClick.bind(this)} onLoginClick={this.onLoginClick.bind(this)} />
          </div>
          <div>
            {this.state.showLogin ? <Login /> : null}
          </div>
          <div>
            {this.state.showSignUp ? <Signup /> : null}
          </div>
          <h1>mood.ly</h1>
          <Nav handleSearchChange={this.handleSearchChange.bind(this)} handleSearchButtonClick={this.handleSearchButtonClick.bind(this)}/>
          <div className="moodly-content">
            <span className="quote-title"><h2>{this.state.currQuote}</h2></span>
          </div>
        </div>
      );
    }
}

export default App;

// <Login onLoginClick={this.onLoginClick.bind(this)} />
