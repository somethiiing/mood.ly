import React, { PropTypes, Component } from 'react';
import MoodItem from './moodItem';

class Mood extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-data">
        {this.moodList.map((mood, i) => (
          <MoodItem mood={mood} key={i} onMoodClick={this.props.onMoodClick} />
        ))}
      </div>
    );
  }
}

Mood.propTypes = {
  mood: PropTypes.object,
  onMoodClick: PropTypes.func.isRequired,
};

// EXPORT
export default Mood;
