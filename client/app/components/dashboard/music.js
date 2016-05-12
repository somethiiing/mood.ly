import React, { PropTypes, Component } from 'react';
import controller from '../../services/controllers';

class Music extends Component {
  constructor(props) {
    super(props);

    this.handleLikeButton = this.handleLikeButton.bind(this);    
  }

  handleLikeButton() {
    controller.likeMusic(this.props.videoId, this.props.user);
  }

  render() {
    return (
      <div>
        <iframe className="ytVideo" src={`https://youtube.com/embed/${this.props.videoId}?autoplay=1`} allowFullScreen></iframe>
        <button type="button" onClick={this.handleLikeButton}>Like!</button>
      </div>
    );
  }
}

Music.propTypes = {
  videoId: PropTypes.element,
  user: PropTypes.element,
};

export default Music;
