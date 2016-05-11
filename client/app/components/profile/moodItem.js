import React, { PropTypes, Component } from 'react';

class MoodItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.mood.mood) {
      throw new Error('Oops! There is no such mood. Try again.');
    }
    return (
      <div>
        <span className="mood">{this.mood.mood}</span>
      </div>
    );
  }
}

MoodItem.propTypes = {
  mood: PropTypes.element.isRequired,
};

export default MoodItem;
