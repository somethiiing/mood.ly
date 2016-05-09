import React, { PropTypes, Component } from 'react';
import QuoteItem from './quoteItem';

class Quote extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-data">
        {this.quoteList.map((quote, i) => (
          <QuoteItem quote={quote} key={i} onQuoteClick={this.onQuoteClick} />
        ))}
      </div>
    );
  }
}

Quote.propTypes = {
  quote: PropTypes.object,
  onQuoteClick: PropTypes.func.isRequired,
};

// EXPORT
export default Quote;
