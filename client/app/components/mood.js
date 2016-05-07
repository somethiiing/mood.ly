import React from 'react';

export default (props) =>
  <div className="container-data">
    {props.moodList.map((mood, i) => 
      <MoodItem mood={mood} key={i} onMoodClick={props.onMoodClick} />
    )}
  </div>;
