import React from 'react';
// import Mood from './components/mood';
import Liked from './liked';
// import LikedItem from './likedItem';
import UserController from '../../services/controllers';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quoteList: [],
      gifList: [],
      musicList: [],
    };
  }

  componentWillMount() {
    this.getAllUserLikes();
  }

  getAllUserLikes() {
    const self = this;
    const username = this.props.user.username;

    // QUOTES
    // =============================================
    UserController.getAllUserLikes('quotes', username, (res) => {
      console.log(res);
      self.setState({ quoteList: res });
    });

    // GIPHY
    // =============================================
    UserController.getAllUserLikes('giphys', username, (res) => {
      console.log(res);
      self.setState({ gifList: res });
    });

    // MUSIC
    // =============================================
    UserController.getAllUserLikes('music', username, (res) => {
      console.log(res);
      self.setState({ musicList: res });
    });
  }

  render() {
    return (
      <div className="profile-content">
        <h1>Hi, {this.props.user.name}!</h1>
        {this.state.quoteList.map(quote =>
          <div id="quote">
            <h3>{quote.text}</h3>
          </div>
          )}
        {this.state.gifList.map(gif =>
          <img src={gif.url} alt="" />
          )}
        {this.state.musicList.map(music =>
          <iframe src={`https://youtube.com/embed/${music.videoId}`} height="480px" width="640px" />
          )}
      </div>
    );
  }
}

Profile.propTypes = {
  user: React.PropTypes.element,
};

export default Profile;
