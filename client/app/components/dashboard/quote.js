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
          <QuoteItem quote={quote} key={i} />
        ))}
      </div>
    );
  }
}

Quote.propTypes = {
  quote: PropTypes.object,
};

// EXPORT
export default Quote;
