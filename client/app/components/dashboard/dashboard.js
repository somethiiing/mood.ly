import React, { PropTypes, Component } from 'react';
import Search from './search';
import services from '../../services/services';
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
      showQuoteItem: false,
      showGifItem: false,
      showMusicItem: false,
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
  }

  handleSearchButtonClick() {
    const self = this;
    const query = this.state.currentSearch;
    services.apiCall('wikiInfo', query, (res) => {
      const randomIndex = Math.floor((Math.random() * res.length) + 1);
      self.setState({
        currMood: query,
        currQuote: res[randomIndex],
        showQuoteItem: true,
      });
    });
    services.apiCall('giphyInfo', query, (res) => {
      const randomIndex = Math.floor((Math.random() * res.length) + 1);
      self.setState({
        currentGif: res[randomIndex],
        showGifItem: true,
      });
    });
    services.apiCall('musicInfo', query, (res) => {
      if (res.status === 'SUCCESS') {
        self.setState({
          currVideoID: res.videoID,
          showMusicItem: true,
        });
      }
    });
  }

  handleSearchChange(event) {
    this.setState({
      currentSearch: event.target.value,
    });
  }

  render() {
    return (
      <div className="grid">
        <Search
          handleSearchChange={this.handleSearchChange}
          handleSearchButtonClick={this.handleSearchButtonClick}
        />
        <div>
          {this.state.showQuoteItem ?
            <QuoteItem
              quote={this.state.currQuote}
              user={this.props.user}
            /> : null}
          {this.state.showGifItem ?
            <GifItem
              gif={this.state.currentGif}
              user={this.props.user}
            /> : null}
          {this.state.showMusicItem ?
            <Music
              videoId={this.state.currVideoID}
              user={this.props.user}
            /> : null}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  user: PropTypes.element,
  // quote: PropTypes.element.isRequired,
  // gif: PropTypes.element.isRequired,
};

/* <div className="moodly-content">
  <span className="quote-title"><h2>{this.state.currQuote}</h2></span>
</div>

<img src={this.state.currentGif} alt="" /> */

// Dashboard.propTypes = {
//   handleSearchChange: PropTypes.func.isRequired,
//   handleSearchButtonClick: PropTypes.func.isRequired,
// };

export default Dashboard;
