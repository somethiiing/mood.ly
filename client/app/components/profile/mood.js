import React from 'react';
import MoodItem from './moodItem';

class Mood extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
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
  mood: React.PropTypes.object,
  onMoodClick: React.PropTypes.func.isRequired,
};

// EXPORT
export default Mood;
