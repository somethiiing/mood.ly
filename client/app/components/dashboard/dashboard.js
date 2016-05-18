import React from 'react';
import Music from './music';
import Search from './search';
import GifItem from './gifItem';
import QuoteItem from './quoteItem';
import Dialog from 'material-ui/Dialog';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import services from '../../services/services';
import Button from 'react-bootstrap/lib/Button';
import controller from '../../services/controllers';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GridView from './gridView';
import Infinite from 'react-infinite';

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
      open: false,
      isInfiniteLoading: false,
      elements: [],
      searchCount: 0,
    };

    this.buildElements = this.buildElements.bind(this);
    this.handleInfiniteLoad = this.handleInfiniteLoad.bind(this);
    this.emptyCheck = this.emptyCheck.bind(this);
    this.dialogOpen = this.dialogOpen.bind(this);
    this.dialogClose = this.dialogClose.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
  }

  dialogOpen() {
    return this.setState({
      open: true,
    });
  }

  dialogClose() {
    return this.setState({
      open: false,
    });
  }

  emptyCheck(str) {
    let response = true;
    for (let i = 0; i < str.length - 1; i++) {
      if (str[i] !== ' ') {
        response = false;
      }
    }
    return response;
  }

  handleSearchButtonClick() {
    const self = this;
    const query = this.state.currentSearch;
    if (this.emptyCheck(query) === false) {
      services.apiCall('wikiInfo', query, (res) => {
        if (res.success === true) {
          self.setState({
            currMood: query,
            currQuote: res.body,
            showQuoteItem: true,
          });
        }
        if (res.success === false) {
          self.setState({
            showQuoteItem: false,
          });
          throw new Error(res.body);
        }
      });
      services.apiCall('giphyInfo', query, (res) => {
        if (res.success === true) {
          self.setState({
            currMood: query,
            currentGif: res.body,
            showGifItem: true,
          });
        }
        if (res.success === false) {
          throw new Error(res.body);
        }
      });
      services.apiCall('musicInfo', query, (res) => {
        if (res.success === true) {
          self.setState({
            currMood: query,
            currVideoID: res.videoID,
            showMusicItem: true,
          });
        }
        if (res.success === false) {
          throw new Error(res.body);
        }
      });
      controller.addUserMood(query, this.props.user, (res) => { console.log(res); });
    } else {
      this.dialogOpen(); 
    }
  }

  handleSearchChange(event) {
    this.setState({
      currentSearch: event.target.value,
    });
  }

  buildElements() {
    // this.handleSearchButtonClick();
    const elements = [];
    elements.push(
      <GridView
        showGifItem={this.state.showGifItem}
        showQuoteItem={this.state.showQuoteItem}
        showMusicItem={this.state.showMusicItem}
        currentGif={this.state.currentGif}
        currMood={this.state.currMood}
        user={this.props.user}
        currQuote={this.state.currQuote}
        currVideoID={this.state.currVideoID}
      />
    );
    return elements;
  }

  handleInfiniteLoad() {
    if (this.state.currentSearch) {
      this.handleSearchButtonClick();
    }
    console.log('handle on infinite load');
    this.setState({
      isInfiniteLoading: true,
    });
    setTimeout(() => {
      const newElements = this.buildElements();
      this.setState({
        isInfiniteLoading: false,
        elements: this.state.elements.concat(newElements),
      });
      console.log(JSON.stringify(this.state.elements));
    }, 2500);
  }
  elementInfiniteLoad() {
    console.log('element infinite load');
    return (
      <div className="infinite-list-item">
        Loading...
      </div>
    );
  }

  render() {

    const actions = [
      <Button
        bsSize="large"
        className="primary-button"
        onClick={this.dialogClose}
      >
      OK
      </Button>,
    ];

    return (
      <div>
        <Search
          handleSearchChange={this.handleSearchChange}
          handleSearchButtonClick={this.handleSearchButtonClick}
        />
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Dialog
            actions={actions}
            open={this.state.open}
            onRequestClose={this.dialogClose}
          >
          Oops. Please enter how you're feeling then hit submit!
          </Dialog>
        </MuiThemeProvider>
        <Infinite
          elementHeight={400}
          containerHeight={400}
          infiniteLoadBeginEdgeOffset={200}
          useWindowAsScrollContainer={true}
          onInfiniteLoad={this.handleInfiniteLoad}
          loadingSpinnerDelegate={this.elementInfiniteLoad()}
          isInfiniteLoading={this.state.isInfiniteLoading}
          timeScrollStateLastsForAfterUserScrolls={1000}
        >
          {this.state.elements}
        </Infinite>
      </div>
    );
  }
}

/*          <GridView
            showGifItem={this.state.showGifItem}
            showQuoteItem={this.state.showQuoteItem}
            showMusicItem={this.state.showMusicItem}
            currentGif={this.state.currentGif}
            currMood={this.state.currMood}
            user={this.props.user}
            currQuote={this.state.currQuote}
            currVideoID={this.state.currVideoID}
          />*/

Dashboard.propTypes = {
  user: React.PropTypes.object,
};

export default Dashboard;
