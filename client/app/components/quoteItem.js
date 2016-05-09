import React, { PropTypes, Component } from 'react';

class QuoteItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.quote) {
      throw new Error('Oops! No quote available. Try again after some time.');
    }
    return (
      <div onChange={() => this.props.onQuoteClick}>
        <span className="quote"><h3>{console.log(this.quote)}<br /></h3></span>
      </div>
    );
  }
}

QuoteItem.propTypes = {
  quote: PropTypes.element.isRequired,
  onQuoteClick: PropTypes.func.isRequired,
};

export default QuoteItem;
