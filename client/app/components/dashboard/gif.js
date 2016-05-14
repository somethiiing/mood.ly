import React from 'react';
import GifItem from './gifItem';

class Gif extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="container-data">
        {this.gifList.map((gif, i) => (
          <GifItem gif={gif} key={i} />
        ))}
      </div>
    );
  }
}

Gif.propTypes = {
  gif: React.PropTypes.object,
};

// EXPORT
export default Gif;
