import React from 'react';
// import Mood from './components/mood';
import Liked from './liked';
// import LikedItem from './likedItem';
import UserController from '../../services/controllers';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gifList: [],
    };
  }

  componentWillMount() {
    this.getAllUserGiphys();
  }

  getAllUserGiphys() {
    const self = this;
    const username = this.props.user.username;

    UserController.getAllUserGiphys(username, (res) => {
      console.log(res);
      self.setState({ gifList: res });
    });
  }

  render() {
    return (
      <div className="profile-content">
        <h1>PROFILE</h1>
        {this.state.gifList.map(gif =>
          <img src={gif.url} alt="" />
          )}
      </div>
    );
  }
}

Profile.propTypes = {
  user: React.PropTypes.element,
};

export default Profile;
