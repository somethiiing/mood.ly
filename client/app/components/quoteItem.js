import React from 'react';

React.createClass({
  propTypes: {
    quote: React.PropTypes.element.isRequired,
  };
})

export default (props) => <div>{props.quote}</div>;

class QuoteItem extends React.Component {
  render() {
    if (!this.props.quote) {
      throw new Error('Oops! No quote available. Try again after some time.');
    }
    return (
      <div onChange={() => this.props.onChoiceClick(this.props.quote)}>
        <span className="quote"><h3>{console.log(this.props.quote)}<br /></h3></span>
      </div>
    )
  }
};
