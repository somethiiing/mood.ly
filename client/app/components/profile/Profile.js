import React from 'react';
// import Mood from './components/mood';
import Liked from './liked';
// import LikedItem from './likedItem';
import UserController from '../../services/controllers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardHeader, CardText, CardMedia } from 'material-ui/Card';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import IconButton from 'material-ui/IconButton';
import Headset from 'material-ui/svg-icons/hardware/headset';
import ImageCamera from 'material-ui/svg-icons/image/camera-alt';
import EditorInsertComment from 'material-ui/svg-icons/editor/insert-comment';

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
                      <Card
                        style={{
                          height: 350,
                          width: 300,
                          margin: '0 auto',
                        }}
                      >
                        <CardHeader
                          style={{
                            height: 75,
                          }}
                        >
                          <IconButton
                            style={{
                              float: 'left',
                            }}
                          ><EditorInsertComment /></IconButton>
                          <IconButton
                            style={{
                              float: 'right',
                            }}
                            onClick={this.handleShareButton.bind(this, quote.id, 'quotes')}
                          ><i className="fa fa-facebook fa-2x" aria-hidden="true"></i></IconButton>
                        </CardHeader>
                        <CardText
                          style={{
                            textAlign: 'center',
                          }}
                        >
                          {quote.text}
                        </CardText>
                      </Card>
                      )}
                    {this.state.gifList.map(gif =>
                      <Card
                        style={{
                          height: 350,
                          width: 300,
                          margin: '0 auto',
                        }}
                      >
                        <CardHeader
                          style={{
                            height: 75,
                          }}
                        >
                          <IconButton
                            style={{
                              float: 'left',
                            }}
                          ><ImageCamera /></IconButton>
                          <IconButton
                            style={{
                              float: 'right',
                            }}
                            onClick={this.handleShareButton.bind(this, gif.id, 'giphys')}
                          ><i className="fa fa-facebook fa-2x" aria-hidden="true"></i>
                          </IconButton>
                        </CardHeader>
                        <CardMedia>
                          <img src={gif.url} alt="" height="200px" />
                        </CardMedia>
                      </Card>
                      )}
                    {this.state.musicList.map(music =>
                      <Card
                        style={{
                          height: 350,
                          width: 300,
                          margin: '0 auto',
                        }}
                      >
                        <CardHeader
                          style={{
                            height: 75,
                          }}
                        >
                          <IconButton
                            style={{
                              float: 'left',
                            }}
                          ><Headset /></IconButton>
                          <IconButton
                            style={{
                              float: 'right',
                            }}
                            onClick={this.handleShareButton.bind(this, music.id, 'music')}
                          ><i className="fa fa-facebook fa-2x" aria-hidden="true"></i>
                          </IconButton>
                        </CardHeader>
                        <CardMedia>
                          <iframe src={`https://youtube.com/embed/${music.videoId}`} height="200px" width="250px" />
                        </CardMedia>
                      </Card>
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
