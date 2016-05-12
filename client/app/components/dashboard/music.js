import React, { PropTypes, Component } from 'react';

class Music extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <iframe className="ytVideo" src={`https://youtube.com/embed/${this.props.videoId}?autoplay=1`} allowFullScreen></iframe>
    );
  }
}

export default Music;
