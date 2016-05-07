import React, { Component } from 'react';
import { connect } from 'react-redux';
import MoodItem from './moodItem';

class Mood extends Component {
  constructor(props) {
    super(props);

    this.onMoodClick = this.onMoodClick.bind(this);
  }

  onMoodClick() {
    this.setState({
      currMood: !this.state.currMood,
    });
  }

  render() {
    return (
      <div className="container-data">
        {this.moodList.map((mood, i) => (
          <MoodItem mood={mood} key={i} onMoodClick={this.onMoodClick} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    mood: state.mood,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    // WILL BE DETERMINED BY APP FUNCTIONALITY
  }
);

Mood.propTypes = {
  mood: React.PropTypes.object,
  onMoodClick: React.PropTypes.func.isRequired,
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mood);
