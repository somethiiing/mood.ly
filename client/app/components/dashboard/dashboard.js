import React from 'react';
import Search from './search';
import services from '../../services/services';
import QuoteItem from './quoteItem';
import GifItem from './gifItem';
import Music from './music';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';

class Dashboard extends React.Component {
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
      if (res.status === 'SUCCESS') {
        self.setState({
          currMood: query,
          currQuote: res.body,
          showQuoteItem: true,
        });
      }
      if (res.status === 'FAIL') {
        throw new Error(res.body);
      }
    });
    services.apiCall('giphyInfo', query, (res) => {
      if (res.status === 'SUCCESS') {
        self.setState({
          currMood: query,
          currentGif: res.body,
          showGifItem: true,
        });
      }
      if (res.status === 'FAIL') {
        throw new Error(res.body);
      }
    });
    services.apiCall('musicInfo', query, (res) => {
      if (res.status === 'SUCCESS') {
        self.setState({
          currMood: query,
          currVideoID: res.videoID,
          showMusicItem: true,
        });
      }
      if (res.status === 'FAIL') {
        throw new Error(res.body);
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
      <div>
        <Search
          handleSearchChange={this.handleSearchChange}
          handleSearchButtonClick={this.handleSearchButtonClick}
        />
        <Grid>
          <Row className="show-grid">
            {this.state.showQuoteItem ?
              <Col sm={6} md={4}>
                <QuoteItem
                  quote={this.state.currQuote}
                  mood={this.state.currMood}
                  user={this.props.user}
                /></Col> : null}
            {this.state.showGifItem ?
              <Col sm={6} md={4}>
                <GifItem
                  gif={this.state.currentGif}
                  mood={this.state.currMood}
                  user={this.props.user}
                /></Col> : null}
            {this.state.showMusicItem ?
              <Col sm={6} md={4}>
                <Music
                  videoId={this.state.currVideoID}
                  mood={this.state.currMood}
                  user={this.props.user}
                /></Col> : null}
          </Row>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  user: React.PropTypes.element,
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
