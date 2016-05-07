import React from 'react';
import { connect } from 'react-redux';

class MoodItem extends React.Component {
  constructor(props) {
    super(props);

    // ANY MOOD FUNCTIONS NEED TO BE BOUND HERE
  }

  // ADD ANY MOOD FUNCTIONS HERE

  render() {
    if (!this.props.mood.mood) {
      throw new Error('Oops! There is no such mood. Try again.');
    }
    return (
      <div>
        <span className="mood">{this.props.mood.mood}</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    user: state.user,
  }
);

MoodItem.propTypes = {
  mood: React.PropTypes.element.isRequired,
};

export default connect(
  mapStateToProps
)(MoodItem);
