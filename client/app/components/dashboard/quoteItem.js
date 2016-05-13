import React, { PropTypes, Component } from 'react';
import controller from '../../services/controllers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

class QuoteItem extends Component {
  constructor(props) {
    super(props);

    this.handleLikeButton = this.handleLikeButton.bind(this);
  }

  handleLikeButton() {
    controller.likeQuote(this.props.quote, this.props.user);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div onChange={() => this.props.onQuoteClick}>
          <span className="quote"><h3>{this.props.quote}<br /></h3></span>
          <RaisedButton
            label="like"
            onClick={this.handleLikeButton}
            primary={Boolean(true)}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

QuoteItem.propTypes = {
  quote: PropTypes.element,
  user: PropTypes.element,
  onQuoteClick: PropTypes.func,
};

export default QuoteItem;
