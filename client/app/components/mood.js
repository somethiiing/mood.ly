import React, { PropTypes, Component } from 'react';

React.createClass({
  propTypes: {
    moodList: React.PropTypes.array.isRequired,
  };
})

export default Mood = (props) => {
  return (
    <div className="container-data">
      {props.moodList.map((mood, i) => 
        <MoodItem mood={mood} key={i} onMoodClick={props.onMoodClick} />
      )}
    </div>
  ) 
};