import React from 'react';
import QuoteItem from './quoteItem';
import GifItem from './gifItem';
import Music from './music';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';

class GridView extends React.Component {
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
      moodData: [],
      isInfiniteLoading: false,
    };
  }
  render() {
    return (
      <Grid>
        <Row
          className="show-grid"
          style={{
            paddingBottom: 100,
          }}
        >
          {this.state.showGifItem ?
            <Col sm={6} md={4} className="card-spacing">
              <GifItem
                gif={this.props.gif}
                mood={this.props.mood}
                user={this.props.user}
              /></Col> : null}
          {this.state.showQuoteItem ?
            <Col sm={6} md={4} className="card-spacing">
              <QuoteItem
                quote={this.props.quote}
                mood={this.props.mood}
                user={this.props.user}
              /></Col> : null}
          {this.state.showMusicItem ?
            <Col sm={6} md={4} className="card-spacing">
              <Music
                videoId={this.props.videoId}
                mood={this.props.mood}
                user={this.props.user}
              /></Col> : null}
        </Row>
      </Grid>
    );
  }
}
GridView.propTypes = {
  quote: React.PropTypes.element,
  gif: React.PropTypes.element,
  videoId: React.PropTypes.element,
  mood: React.PropTypes.element,
  user: React.PropTypes.element,
};


export default GridView;
