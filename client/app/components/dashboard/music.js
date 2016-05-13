import React, { PropTypes, Component } from 'react';
import controller from '../../services/controllers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

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
      <MuiThemeProvider>
        <div>
          <iframe className="ytVideo" src={`https://youtube.com/embed/${this.props.videoId}?autoplay=1`} allowFullScreen></iframe>
          <RaisedButton
            label="like"
            onClick={this.handleLikeButton}
            primary={Boolean(true)}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

Music.propTypes = {
  videoId: PropTypes.element,
  user: PropTypes.element,
};

export default Music;
