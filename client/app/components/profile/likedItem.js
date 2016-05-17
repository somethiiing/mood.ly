import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class LikedItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
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
  likedItem: React.PropTypes.element.isRequired,
};

export default LikedItem;
