import React, { PropTypes, Component } from 'react';
import Search from './search';
import apiCall from '../../services/services.js';
import QuoteItem from './quoteItem';
import GifItem from './gifItem';
import Music from './music';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currQuote: '',
      currMood: '',
      currentGif: '',
      currentSearch: '',
      currVideoID: '',
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
  }

  handleSearchButtonClick() {
    const self = this;
    const query = this.state.currentSearch;
    apiCall('wikiInfo', query, (res) => {
      const randomIndex = Math.floor((Math.random() * res.length) + 1);
      self.setState({
        currMood: query,
        currQuote: res[randomIndex],
      });
    });
    apiCall('giphyInfo', query, (res) => {
      const randomIndex = Math.floor((Math.random() * res.length) + 1);
      self.setState({
        currentGif: res[randomIndex],
      });
    });
    apiCall('musicInfo', query, (res) => {
      self.setState({
        currVideoID: res,
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
      <div className="dashboard-content">
        <Search
          handleSearchChange={this.handleSearchChange}
          handleSearchButtonClick={this.handleSearchButtonClick}
        />
        <QuoteItem quote={this.state.currQuote} />
        <GifItem gif={this.state.currentGif} />
        <Music videoId={this.state.currVideoID} />
      </div>
    );
  }
}

// Dashboard.propTypes = {
//   quote: PropTypes.element.isRequired,
//   gif: PropTypes.element.isRequired,
// };

/* <div className="moodly-content">
  <span className="quote-title"><h2>{this.state.currQuote}</h2></span>
</div>

<img src={this.state.currentGif} alt="" /> */

// Dashboard.propTypes = {
//   handleSearchChange: PropTypes.func.isRequired,
//   handleSearchButtonClick: PropTypes.func.isRequired,
// };

export default Dashboard;
