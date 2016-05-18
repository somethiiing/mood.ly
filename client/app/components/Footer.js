import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <footer>
          <div className="container">
            <ul className="social-buttons">
              <a href="https://www.facebook.com/OfficialMoodly/" target="_blank"><i className="fa fa-facebook fa-2x" aria-hidden="true"></i></a>
              <a href="hthttps://twitter.com/officialmoodly" target="_blank"><i className="fa fa-twitter fa-2x" aria-hidden="true"></i></a>
              <a href="https://soundcloud.com/officialmoodly" target="_blank"><i className="fa fa-soundcloud fa-2x" aria-hidden="true"></i></a>
            </ul>
          </div>
        </footer>
      </MuiThemeProvider>
    );
  }
}

export default Footer;
