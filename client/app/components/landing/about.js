import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import InsertEmoticon from 'material-ui/svg-icons/editor/insert-emoticon';
import PeopleOutline from 'material-ui/svg-icons/social/people-outline'

class About extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="about-content" id="about">
          <h2>about</h2>
          <Grid>
            <Row className="show-grid">
              <Col md={4} sm={6} className="about-col">
                <InsertEmoticon
                  color="white"
                  style={{
                    width: 44,
                    height: 44,
                  }}
                />
                <h3>generate</h3>
                <p>tell us how you're feeling and we'll generate content tailored to your mood.</p>
              </Col>
              <Col md={4} sm={6} className="about-col">
                <FavoriteBorder
                  color="white"
                  style={{
                    width: 44,
                    height: 44,
                  }}
                />
                <h3>save</h3>
                <p>save quotes, music, and gifs that you like to your personal profile, complete with a history of your moods.</p>
              </Col>
              <Col md={4} sm={6} className="about-col">
                <PeopleOutline
                  color="white"
                  style={{
                    width: 44,
                    height: 44,
                  }}
                />
                <h3>share</h3>
                <p>connect with a facebook account and share your favorites with all your friends!</p>
              </Col>
            </Row>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default About;