import React from 'react';
// import Mood from './components/mood';
import Liked from './liked';
// import LikedItem from './likedItem';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="profile-content">
        <Liked user={this.props.user} />
      </div>
    );
  }
}

Profile.propTypes = {
  user: React.PropTypes.element,
};

export default Profile;
