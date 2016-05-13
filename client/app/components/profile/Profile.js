import React, { PropTypes, Component } from 'react';
// import Mood from './components/mood';
import Liked from './liked';
// import LikedItem from './likedItem';

class Profile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="profile-content">
        <Mood />
        <Liked user={this.props.user} />
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.element,
  // handleSearchChange: PropTypes.func.isRequired,
  // handleSearchButtonClick: PropTypes.func.isRequired,
};

export default Profile;
