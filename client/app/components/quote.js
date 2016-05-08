import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuoteItem from './quoteItem';

class Quote extends Component {
  constructor(props) {
    super(props);

    this.onQuoteClick = this.onQuoteClick.bind(this);
  }

  onQuoteClick() {
    this.setState({
      currQuote: !this.state.currQuote,
    });
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

const mapStateToProps = (state) => (
  {
    quote: state.quote,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    // WILL BE DETERMINED BY APP FUNCTIONALITY
  }
);

Quote.propTypes = {
  quote: React.PropTypes.object,
  onQuoteClick: React.PropTypes.func.isRequired,
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quote);
