import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class MoodItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (!this.props.mood.mood) {
      throw new Error('Oops! There is no such mood. Try again.');
    }
    return (
      <MuiThemeProvider>
        <div>
          <span className="mood">{this.mood.mood}</span>
        </div>
      </MuiThemeProvider>
    );
  }
}

MoodItem.propTypes = {
  mood: React.PropTypes.string,
};

export default MoodItem;
