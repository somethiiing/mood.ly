import React, { PropTypes, Component } from 'react';
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
      <div>
        <img className="gif" src={this.props.gif} alt='' />
        <button type="button" onClick={this.handleLikeButton}>Like!</button>
      </div>
    );
  }
}

GifItem.propTypes = {
  gif: PropTypes.element,
  user: PropTypes.element,
};

export default GifItem;
