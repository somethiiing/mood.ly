import React, { PropTypes, Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class LikedItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.likedItem) {
      throw new Error('Oops! No liked items available. Try again after some time.');
    }
    return (
      <MuiThemeProvider>
        <div>
          <span className="liked">{this.likedItem}</span>
        </div>
      </MuiThemeProvider>
    );
  }
}

LikedItem.propTypes = {
  likedItem: PropTypes.element.isRequired,
};

export default LikedItem;