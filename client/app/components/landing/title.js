import React, { PropTypes, Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import Button from 'react-bootstrap/lib/Button';

class Title extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="landing-header container">
          <h3 className="landing-title">mood.ly</h3>
          <div className="landing-buttons">
            <Button bsSize="large" className="landing-button">about</Button>
            <Button bsSize="large" className="landing-button">sign in</Button>
          </div>
          <h1>mood.ly</h1>
          <h2>a place to explore your mood</h2>
          <br />
          <br />
          <br />
          <br />
          <NavigationArrowDownward />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Title;