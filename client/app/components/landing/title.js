import React, { PropTypes, Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

class Title extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="landing-header container">
          <Grid>
            <Row className="show-grid">
            <h3 className="pull-left landing-title">mood.ly</h3>
            <div className="landing-buttons">
              <Button bsSize="large" className="landing-button">about</Button>
              <Button bsSize="large" className="landing-button">get started</Button>
            </div>
            </Row>
          </Grid>
          <h1>mood.ly</h1>
          <h2>a place to explore your mood</h2>
          <br />
          <NavigationArrowDownward />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Title;