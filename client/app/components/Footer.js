import React, { PropTypes, Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class Footer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <footer>
          <div className="container">
            <ul className="social-buttons">
              <a href="#"><i className="fa fa-facebook fa-2x" aria-hidden="true"></i></a>
              <a href="#"><i className="fa fa-twitter fa-2x" aria-hidden="true"></i></a>
              <a href="#"><i className="fa fa-soundcloud fa-2x" aria-hidden="true"></i></a>
            </ul>
          </div>
        </footer>
      </MuiThemeProvider>
    );
  }
}

export default Footer;
