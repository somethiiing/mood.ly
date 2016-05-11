import React, { PropTypes, Component } from 'react';

class GifItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img className="gif" src={this.props.gif} alt='' />
      </div>
    );
  }
}

// GifItem.propTypes = {
//   gif: PropTypes.element.isRequired,
// };

export default GifItem;
