import React, { PropTypes, Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Footer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className="footer">
          <div>
            <ul className="socialButtons">
              <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
              <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
              <a href="#"><i className="fa fa-soundcloud" aria-hidden="true"></i></a>
            </ul>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Footer.propTypes = {
  // onLoginClick: PropTypes.func.isRequired,
  // onSignUpClick: PropTypes.func.isRequired,
};

export default Footer;