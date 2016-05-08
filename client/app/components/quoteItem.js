import React from 'react';
import { connect } from 'react-redux';

class QuoteItem extends React.Component {
  constructor(props) {
    super(props);

    // ANY QUOTE FUNCTIONS NEED TO BE BOUND
  }

  // ADD ANY QUOTE FUNCTIONS HERE
  render() {
    if (!this.props.quote) {
      throw new Error('Oops! No quote available. Try again after some time.');
    }
    return (
      <div onChange={() => this.props.onQuoteClick}>
        <span className="quote"><h3>{console.log(this.props.quote)}<br /></h3></span>
      </div>
    );
  }
}

QuoteItem.propTypes = {
  quote: React.PropTypes.element.isRequired,
  onQuoteClick: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => (
  {
    user: state.user,
  }
);

export default connect(
  mapStateToProps
)(QuoteItem);
