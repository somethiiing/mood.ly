import React from 'react';

React.createClass({
  propTypes: {
    mood: React.PropTypes.element.isRequired,
  };
})

export default (props) => <div>{props.mood}</div>;

class MoodItem extends React.Component {
  render() {
    if (!this.props.mood.mood) {
      throw new Error('Oops! There is no such mood. Try again.');
    }
    return
      <div>
        <span className="mood">{this.props.mood.mood}</span>
      </div>
  }
};
