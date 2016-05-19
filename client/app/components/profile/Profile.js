// import Mood from './components/mood';
// import LikedItem from './likedItem';
import React from 'react';
import Liked from './liked';
import PieChart from '../d3/PieChart';
import D3PieChart from '../d3/D3PieChart';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import IconButton from 'material-ui/IconButton';
import Button from 'react-bootstrap/lib/Button';
import UserController from '../../services/controllers';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Headset from 'material-ui/svg-icons/hardware/headset';
import ImageCamera from 'material-ui/svg-icons/image/camera-alt';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardHeader, CardText, CardMedia } from 'material-ui/Card';
import EditorInsertComment from 'material-ui/svg-icons/editor/insert-comment';
<<<<<<< 14b14a8756b930146a4bf310644e4a8952c777e0
// import PieChart from '../d3/PieChart';
import D3PieChart from '../d3/D3PieChart';
=======

>>>>>>> updates

const moodlyUrl = 'moodly.io';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quoteList: [],
      gifList: [],
      musicList: [],
      pieChartDisplay: 'user',
    };

    this.showUserChart = this.showUserChart.bind(this);
    this.showMoodlyChart = this.showMoodlyChart.bind(this);
  }

  componentWillMount() {
    this.getAllUserLikes();
  }

  getAllUserLikes() {
    const self = this;
    const username = this.props.user.username;

    // QUOTES
    // =============================================
    UserController.getAllUserData('quotes', username, (res) => {
      self.setState({ quoteList: res.body });
    });

    // GIPHY
    // =============================================
    UserController.getAllUserData('giphys', username, (res) => {
      self.setState({ gifList: res.body });
    });

    // MUSIC
    // =============================================
    UserController.getAllUserData('music', username, (res) => {
      self.setState({ musicList: res.body });
    });
  }

  showUserChart() {
    UserController.getMoodData(data => {
      this.setState({
        moodData: data,
        pieChartDisplay: 'user',
      });
    });
  }

  showMoodlyChart() {
    UserController.getAllUserData('moods', this.props.user.name, data => {
      this.setState({
        moodData: data,
        pieChartDisplay: 'moodly',
      });
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
    let chartTitle;
    let chartButton;
    let changeChart;
    let displayedChart;
    if (this.state.pieChartDisplay === 'user') {
      changeChart = this.showMoodlyChart;
      chartButton = 'show Moodly\'s Mood History';
      chartTitle = `${this.props.user.name}'s mood history`;
      displayedChart = (
        <D3PieChart data={this.props.moodData} title="" />
      );
    }
    if (this.state.pieChartDisplay === 'moodly') {
      changeChart = this.showUserChart;
      chartButton = `show ${this.props.user.name}'s mood history`;
      chartTitle = 'Moodly\'s Mood History';
      displayedChart = (
        <D3PieChart data={this.props.moodData} title="" />
      );
    }


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
                    <h2 onClick={changeChart}>{chartTitle}</h2>
                    {displayedChart}
                  </CardText>
                  <Button
                    bsSize="large"
                    onClick={changeChart}
                    className="nav-button"
                  >
                  {chartButton}
                  </Button>
                </Card>
              </Col>
              <Col
                md={8}
                style={{
                  overflow: 'scroll',
                }}
              >
                <Card
                  style={{
                    margin: '0 auto',
                    height: 500,
                  }}
                >
                  <CardText>
                    <h2>{this.props.user.name}'s likes</h2>
                    <br />
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
  user: React.PropTypes.object,
  moodData: React.PropTypes.array,
};

export default Profile;
