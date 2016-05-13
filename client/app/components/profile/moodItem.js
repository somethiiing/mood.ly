import React, { PropTypes, Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class MoodItem extends Component {
  constructor(props) {
    super(props);
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
  mood: PropTypes.element.isRequired,
};

export default MoodItem;
