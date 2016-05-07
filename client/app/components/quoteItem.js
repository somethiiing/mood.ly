import React from 'react';

export default (props) => <div>{props.quote}</div>;

class QuoteItem extends React.Component {
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
