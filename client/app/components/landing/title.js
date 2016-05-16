import React, { PropTypes, Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';

class Title extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="landing-header container">
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