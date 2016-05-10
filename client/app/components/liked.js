import React, { PropTypes, Component } from 'react';
import LikedItem from './likedItem';

class Liked extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-data">
        {this.likedList.map((liked, i) => (
          <LikedItem liked={liked} key={i} onLikedClick={this.props.onLikedClick} />
        ))}
      </div>
    );
  }
}

Liked.propTypes = {
  liked: PropTypes.object,
  //onMoodClick: PropTypes.func.isRequired,
};

// EXPORT
export default Liked;