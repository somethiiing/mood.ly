import React, { PropTypes, Component } from 'react';

class GifItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.gif) {
      throw new Error('Oops! No gif available. Try again after some time.');
    }
    return (
      <div>
        <span className="gif">{this.gif}</span>
      </div>
    );
  }
}

GifItem.propTypes = {
  gif: PropTypes.element.isRequired,
};

export default GifItem;