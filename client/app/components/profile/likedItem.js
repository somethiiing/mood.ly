import React, { PropTypes, Component } from 'react';

class LikedItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.likedItem) {
      throw new Error('Oops! No liked items available. Try again after some time.');
    }
    return (
      <div>
        <span className="liked">{this.likedItem}</span>
      </div>
    );
  }
}

LikedItem.propTypes = {
  likedItem: PropTypes.element.isRequired,
};

export default LikedItem;