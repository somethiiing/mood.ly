import React from 'react';
import Button from 'react-bootstrap/lib/Button';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueSingle: null,
    };

    this.handleMoodlyClick = this.handleMoodlyClick.bind(this);
    this.handleLogoutButtonClick = this.handleLogoutButtonClick.bind(this);
    this.handleProfileButtonClick = this.handleProfileButtonClick.bind(this);
  }

  handleMoodlyClick() {
    this.props.dashboard();
  }

  handleLogoutButtonClick() {
    this.props.logout();
  }

  handleProfileButtonClick() {
    this.props.profile();
    this.props.handleMoodData();
  }

  render() {
    return (
      <div className="nav-header container">
        <h3 className="nav-title" onClick={this.handleOnMoodlyClick}>mood.ly</h3>
        <div className="nav-buttons">
          <Button
            bsSize="large"
            className="primary-button nav-button"
            onClick={this.handleProfileButtonClick}
          >
          profile
          </Button>
          <Button
            bsSize="large"
            className="primary-button nav-button"
            onClick={this.handleLogoutButtonClick}
          >
          logout
          </Button>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  logout: React.PropTypes.func,
  profile: React.PropTypes.func,
  dashboard: React.PropTypes.func,
  handleMoodData: React.PropTypes.func,
};

export default Header;
