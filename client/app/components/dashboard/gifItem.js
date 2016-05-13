import React, { PropTypes, Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import controller from '../../services/controllers';

class GifItem extends Component {
  constructor(props) {
    super(props);

    this.handleLikeButton = this.handleLikeButton.bind(this);
  }

  handleLikeButton() {
    controller.likeGiphy(this.props.gif, this.props.user);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <img className="gif" src={this.props.gif} alt="" />
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

GifItem.propTypes = {
  gif: PropTypes.element,
  user: PropTypes.element,
};

export default GifItem;
