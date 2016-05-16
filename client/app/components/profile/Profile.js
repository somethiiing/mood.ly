import React from 'react';
// import Mood from './components/mood';
import Liked from './liked';
// import LikedItem from './likedItem';
import UserController from '../../services/controllers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardText } from 'material-ui/Card';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';

const moodlyUrl = 'moodly.io';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quoteList: [],
      gifList: [],
      musicList: [],
    };
  }

  componentWillMount() {
    this.getAllUserLikes();
  }

  getAllUserLikes() {
    const self = this;
    const username = this.props.user.username;

    // QUOTES
    // =============================================
    UserController.getAllUserLikes('quotes', username, (res) => {
      self.setState({ quoteList: res });
    });

    // GIPHY
    // =============================================
    UserController.getAllUserLikes('giphys', username, (res) => {
      self.setState({ gifList: res });
    });

    // MUSIC
    // =============================================
    UserController.getAllUserLikes('music', username, (res) => {
      self.setState({ musicList: res });
    });
  }

  handleShareButton(id, item) {
    console.log(`${moodlyUrl}/api/${item}/${id}`);
    FB.ui({
      method: 'share',
      hashtag: 'moodly',
      href: `${moodlyUrl}/api/${item}/${id}`,
    }, response => {
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="profile-content">
          <Grid>
            <Row className="show-grid">
              <Col md={4}>
                <Card
                  style={{
                    margin: '0 auto',
                    height: 500,
                  }}
                >
                  <CardText>
                    <h2>{this.props.user.name}'s mood history</h2>
                  </CardText>
                </Card>
              </Col>
              <Col md={8}>
                <Card
                  style={{
                    margin: '0 auto',
                    height: 500,
                  }}
                >
                  <CardText>
                    <h2>{this.props.user.name}'s likes</h2>
                    {this.state.quoteList.map(quote =>
                      <div id="quote">
                        <h3>{quote.text}</h3>
                        <button onClick={this.handleShareButton.bind(this, quote.id, 'quotes')}>Share!</button>
                      </div>
                      )}
                    {this.state.gifList.map(gif =>
                      <div id="giphy">
                        <img src={gif.url} alt="" />
                        <button onClick={this.handleShareButton.bind(this, gif.id, 'giphys')}>Share!</button>
                      </div>
                      )}
                    {this.state.musicList.map(music =>
                      <div id="music">
                        <iframe src={`https://youtube.com/embed/${music.videoId}`} height="480px" width="640px" />
                        <button onClick={this.handleShareButton.bind(this, music.id, 'music')}>Share!</button>
                      </div>
                      )}
                  </CardText>
                </Card>
              </Col>
            </Row>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

Profile.propTypes = {
  user: React.PropTypes.element,
};

export default Profile;
