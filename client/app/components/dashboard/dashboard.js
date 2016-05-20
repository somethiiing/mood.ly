import React from 'react';
import Search from './search';
import Dialog from 'material-ui/Dialog';
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
      currSearch: '',
      currVideoID: '',
      showQuoteItem: false,
      showGifItem: false,
      showMusicItem: false,
      open: false,
      isInfiniteLoading: false,
      elements: [],
      searchCount: 0,
    };

    this.apiCalls = this.apiCalls.bind(this);
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

  apiCalls() {
    const self = this;
    const query = this.state.currSearch;
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
  }

  handleSearchButtonClick() {
    const query = this.state.currSearch;
    this.setState({
      elements: [],
    });
    if (this.emptyCheck(query) === false) {
      this.apiCalls();
      controller.addUserMood(query, this.props.user, (res) => { console.log(res); });
    } else
    if (this.emptyCheck(query) === true) {
      this.dialogOpen();
      this.setState({
        isInfiniteLoading: false,
        currMood: ' ',
        currSearch: ' ',
      });
    }
  }

  handleSearchChange(event) {
    this.setState({
      currSearch: event.target.value,
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
    if (this.emptyCheck(this.state.currSearch) === false) {
      this.apiCalls();
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
    }, 2000);
  }
  elementInfiniteLoad() {
    // PLACE TO  PUT A LOADING ELEMENT
    console.log('element infinite load');
    return (
      <div className="infinite-list-item">
        <img
          src="/client/app/styles/spinner-blue.gif"
          style={{
            width: 40,
            height: 40,
            'margin-left': '49vw',
          }}
        />
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
          elementHeight={500}
          infiniteLoadBeginEdgeOffset={1000}
          useWindowAsScrollContainer={true}
          onInfiniteLoad={this.handleInfiniteLoad}
          loadingSpinnerDelegate={this.elementInfiniteLoad()}
          isInfiniteLoading={this.state.isInfiniteLoading}
          timeScrollStateLastsForAfterUserScrolls={2500}
        >
          {this.state.elements}
        </Infinite>
      </div>
    );
  }
}

Dashboard.propTypes = {
  user: React.PropTypes.object,
};

export default Dashboard;
