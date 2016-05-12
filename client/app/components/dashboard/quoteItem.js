import React, { PropTypes, Component } from 'react';

class QuoteItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div onChange={() => this.props.onQuoteClick}>
        <span className="quote"><h3>{this.props.quote}<br /></h3></span>
      </div>
    );
  }
}

// QuoteItem.propTypes = {
//   quote: PropTypes.element.isRequired,
//   //onQuoteClick: PropTypes.func.isRequired,
// };

export default QuoteItem;
