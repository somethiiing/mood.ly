import React, { PropTypes, Component } from 'react';
import wiki from './services/wiki.js';
import $ from 'jquery';
import Nav from './components/Nav';

class App extends Component {
  constructor(props) {
    super(props);

    //searchData -- are we going to have search or dropdown?
      // this.debouncedSearch = _.debouce(searchData, 500, { leading: true }
      // );

    //set default state
    this.state = {
      currMood: '',
      currQuote: '',
      currentSearch: ''
    };
  }

    handleSearchButtonClick() {
      var self = this;
      let query = this.state.currentSearch;
      console.log(query);
      wiki(query, function (res) {
        self.setState({
          currMood: query,
          currQuote: res.body[0] // TODO: CHANGE IN LOGIC TO RANDOMIZE
        });
      });
    }

    handleSearchChange(event) {
      this.setState({currentSearch: event.target.value});
    }

    render() {
      return (
        <div>
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
