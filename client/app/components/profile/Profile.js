import React from 'react';
// import Mood from './components/mood';
import Liked from './liked';
// import LikedItem from './likedItem';
import UserController from '../../services/controllers';

const moodlyUrl = 'moodly.io';

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
      self.setState({ quoteList: res });
    });

    // GIPHY
    // =============================================
    UserController.getAllUserLikes('giphys', username, (res) => {
      self.setState({ gifList: res });
    });

    // MUSIC
    // =============================================
    UserController.getAllUserLikes('music', username, (res) => {
      self.setState({ musicList: res });
    });
  }

  handleShareButton(id, item) {
    console.log(`${moodlyUrl}/api/${item}/${id}`);
    FB.ui({
      method: 'share',
      hashtag: 'moodly',
      href: `${moodlyUrl}/api/${item}/${id}`,
    }, response => {
    });
  }

  render() {
    return (
      <div className="profile-content">
        <h1>Hi, {this.props.user.name}!</h1>
        {this.state.quoteList.map(quote =>
          <div id="quote">
            <h3>{quote.text}</h3>
            <button onClick={this.handleShareButton.bind(this, quote.id, 'quotes')}>Share!</button>
          </div>
          )}
        {this.state.gifList.map(gif =>
          <div id="giphy">
            <img src={gif.url} alt="" />
            <button onClick={this.handleShareButton.bind(this, gif.id, 'giphys')}>Share!</button>
          </div>
          )}
        {this.state.musicList.map(music =>
          <div id="music">
            <iframe src={`https://youtube.com/embed/${music.videoId}`} height="480px" width="640px" />
            <button onClick={this.handleShareButton.bind(this, music.id, 'music')}>Share!</button>
          </div>
          )}
      </div>
    );
  }
}

Profile.propTypes = {
  user: React.PropTypes.element,
};

export default Profile;
