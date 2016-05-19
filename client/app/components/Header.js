import React from 'react';
import Button from 'react-bootstrap/lib/Button';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueSingle: null,
    };

    this.navToDash = this.navToDash.bind(this);
    this.navToProfile = this.navToProfile.bind(this);
    this.navToLogout = this.navToLogout.bind(this);
  }

  navToDash() {
    this.props.dashboard();
  }

  navToLogout() {
    this.props.logout();
  }
  navToProfile() {
    this.props.profile();
    this.props.handleMoodData();
  }

  render() {
    let moodlyButton;
    let buttonDirect = '';
    if (this.props.page === 'dashboard') {
      buttonDirect = (
        <Button
          bsSize="large"
          onClick={this.navToProfile}
          className="nav-button"
        >
        profile
        </Button>
      );
      moodlyButton = this.navToProfile;
    }
    if (this.props.page === 'profile') {
      buttonDirect = (
        <Button
          bsSize="large"
          className="nav-button"
          onClick={this.navToDash}
        >
        dashboard
        </Button>
      );
      moodlyButton = this.navToDash;
    }

    return (
      <div className="nav-header container">
        <h3 className="nav-title nav-title-main" onClick={moodlyButton}>mood.ly</h3>
        <div className="nav-buttons">
          {buttonDirect}
          <Button
            bsSize="large"
            className="nav-button"
            onClick={this.navToLogout}
          >
          logout
          </Button>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  page: React.PropTypes.string,
  logout: React.PropTypes.func,
  profile: React.PropTypes.func,
  dashboard: React.PropTypes.func,
  handleMoodData: React.PropTypes.func,
};

export default Header;
