import React, { PropTypes, Component } from 'react';
import Mood from './components/mood';
import Liked from './components/liked';

class Profile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="profile-content">
        <Mood />
        <Liked />
      </div>
    );
  }
}

Profile.propTypes = {
  // handleSearchChange: PropTypes.func.isRequired,
  // handleSearchButtonClick: PropTypes.func.isRequired,
};

export default Profile;