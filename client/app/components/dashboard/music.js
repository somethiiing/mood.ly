import React, { PropTypes, Component } from 'react';
import controller from '../../services/controllers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardHeader, CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Favorite from 'material-ui/svg-icons/action/favorite';
import Headset from 'material-ui/svg-icons/hardware/headset';

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
        <Card
          style={{
            height: 300,
            width: 300,
          }}
        >
          <CardHeader>
            <IconButton><Headset /></IconButton>
            <IconButton
              onClick={this.handleLikeButton}
            >
              <Favorite />
            </IconButton>
          </CardHeader>
          <CardMedia>
            <iframe src={'https://youtube.com/embed/${this.props.videoId}'} height="250px" width="250px" />
          </CardMedia>
        </Card>
      </MuiThemeProvider>
    );
  }
}

Music.propTypes = {
  videoId: PropTypes.element,
  user: PropTypes.element,
};

export default Music;
