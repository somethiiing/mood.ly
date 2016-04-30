//insert this in app.js for Mood
//{<span className="mood-title"><h2>Mood</h2></span>
//<MoodTable moodList={this.state.quotes} onMoodClock={this.onMoodClick.bind(this)} />}

const Mood = (props) => {
  return (
    <div className="container-data">
      {props.moodList.map((mood, i) => 
        <MoodItem mood={mood} key={i} onMoodClick={props.onMoodClick} />
      )}
    </div>
  ) 
};

//export
window.Mood = Mood;