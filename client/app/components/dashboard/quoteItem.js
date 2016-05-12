import React, { PropTypes, Component } from 'react';
import controller from '../../services/controllers';

class QuoteItem extends Component {
  constructor(props) {
    super(props);

    this.handleLikeButton = this.handleLikeButton.bind(this);
  }

  handleLikeButton() {
    // console.log('I like this: ', this.props.quote);
    controller.likeQuote(this.props.quote, this.props.user);
  }

  render() {
    return (
      <div onChange={() => this.props.onQuoteClick}>
        <span className="quote"><h3>{this.props.quote}<br /></h3></span>
        <button type="button" onClick={this.handleLikeButton}>Like!</button>
      </div>
    );
  }
}

QuoteItem.propTypes = {
  quote: PropTypes.element,
  user: PropTypes.element,
  onQuoteClick: PropTypes.func,
};

export default QuoteItem;
