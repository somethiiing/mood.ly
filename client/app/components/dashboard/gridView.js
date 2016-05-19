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

    this.state = {};
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
          {this.props.showGifItem ?
            <Col sm={6} md={4} className="card-spacing">
              <GifItem
                gif={this.props.currentGif}
                mood={this.props.currMood}
                user={this.props.user}
              /></Col> : null}
          {this.props.showQuoteItem ?
            <Col sm={6} md={4} className="card-spacing">
              <QuoteItem
                quote={this.props.currQuote}
                mood={this.props.currMood}
                user={this.props.user}
              /></Col> : null}
          {this.props.showMusicItem ?
            <Col sm={6} md={4} className="card-spacing">
              <Music
                videoId={this.props.currVideoID}
                mood={this.props.currMood}
                user={this.props.user}
              /></Col> : null}
        </Row>
      </Grid>
    );
  }
}
GridView.propTypes = {
  showGifItem: React.PropTypes.bool,
  showQuoteItem: React.PropTypes.bool,
  showMusicItem: React.PropTypes.bool,
  currQuote: React.PropTypes.string,
  currentGif: React.PropTypes.string,
  currVideoID: React.PropTypes.string,
  currMood: React.PropTypes.string,
  user: React.PropTypes.object,
};

export default GridView;
