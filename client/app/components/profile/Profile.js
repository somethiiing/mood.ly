import React from 'react';
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
import Share from 'material-ui/svg-icons/action/exit-to-app';

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
    this.setState({
      pieChartDisplay: 'user',
    });
  }

  showMoodlyChart() {
    this.setState({
      pieChartDisplay: 'moodly',
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
      chartButton = 'all user history';
      chartTitle = 'my mood history';
      displayedChart = (
        <D3PieChart
          data={this.props.moodDataUser}
          title=""
          width={230}
          height={230}
        />
      );
    }
    if (this.state.pieChartDisplay === 'moodly') {
      changeChart = this.showUserChart;
      chartButton = 'my mood history';
      chartTitle = 'all user history';
      displayedChart = (
        <D3PieChart
          data={this.props.moodDataMoodly}
          title=""
          width={230}
          height={230}
        />
      );
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="profile-content">
          <h1>{this.props.user.name}'s profile</h1>
          <br />
          <Grid>
            <Row className="show-grid">
              <Col md={1} />
              <Col
                md={4}
                className="card-spacing"
              >
                <Card
                  style={{
                    margin: '0 auto',
                    border: '4px solid #424242',
                    borderRadius: '25px',
                    boxShadow: 'none',
                    height: 500,
                  }}
                >
                  <CardText>
                    <div className="profile-cards">
                      <div>
                        <h2 onClick={changeChart}>{chartTitle}</h2>
                        <br />
                        {displayedChart}
                        <br />
                        <br />
                        <br />
                        <Button
                          bsSize="large"
                          onClick={changeChart}
                          className="card-button"
                        >
                        {chartButton}
                        </Button>
                      </div>
                    </div>
                  </CardText>
                </Card>
              </Col>
              <Col
                md={6}
                classname="card-spacing"
              >
                <Card
                  style={{
                    border: '4px solid #424242',
                    borderRadius: '25px',
                    boxShadow: 'none',
                    height: 500,
                    'overflow-y': 'scroll',
                  }}
                >
                  <CardText>
                    <h2>favorites</h2>
                    <br />
                    {this.state.quoteList.map(quote =>
                      <Card
                        style={{
                          height: 350,
                          width: 300,
                          border: '4px solid #424242',
                          borderRadius: '25px',
                          boxShadow: 'none',
                          margin: '0 auto',
                          marginBottom: '15px',
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
                          ><Share
                            color={'#4f94cd'}
                            hoverColor={'#bfefff'}
                          /></IconButton>
                        </CardHeader>
                        <CardText
                          style={{
                            textAlign: 'center',
                            fontFamily: 'Sniglet, cursive',
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
                          border: '4px solid #424242',
                          borderRadius: '25px',
                          boxShadow: 'none',
                          marginBottom: '15px',
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
                          ><Share 
                            color={'#4f94cd'}
                            hoverColor={'#bfefff'}
                          />
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
                          border: '4px solid #424242',
                          borderRadius: '25px',
                          boxShadow: 'none',
                          marginBottom: '15px',
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
                          ><Share 
                            color={'#4f94cd'}
                            hoverColor={'#bfefff'}
                          />
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
              <Col md={1} />
            </Row>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

Profile.propTypes = {
  user: React.PropTypes.object,
  moodDataUser: React.PropTypes.array,
  moodDataMoodly: React.PropTypes.array,
};

export default Profile;
