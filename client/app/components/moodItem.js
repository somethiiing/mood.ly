class MoodItem extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div>
        <span className="mood"><h3>The Mood is: </h3>{this.props.mood.mood}</span>
      </div>
    )
  }
};

//export
window.MoodItem = MoodItem;