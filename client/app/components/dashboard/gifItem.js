import React, { PropTypes, Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardHeader, CardMedia } from 'material-ui/Card';
import controller from '../../services/controllers';
import ImageCamera from 'material-ui/svg-icons/image/camera-alt';
import IconButton from 'material-ui/IconButton';
import Favorite from 'material-ui/svg-icons/action/favorite';

class GifItem extends Component {
  constructor(props) {
    super(props);

    this.handleLikeButton = this.handleLikeButton.bind(this);
  }

  handleLikeButton() {
    controller.likeGiphy(this.props.gif, this.props.user, (data) => {
      console.log('GIF, ', data);
    });
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
            <IconButton><ImageCamera /></IconButton>
            <IconButton
              onClick={this.handleLikeButton}
            >
              <Favorite />
            </IconButton>
          </CardHeader>
          <CardMedia>
            <img src={this.props.gif} alt="" height="60%" width="70%" />
          </CardMedia>
        </Card>
      </MuiThemeProvider>
    );
  }
}

GifItem.propTypes = {
  gif: PropTypes.element,
  user: PropTypes.element,
};

export default GifItem;
