import React, { PropTypes, Component } from 'react';
import controller from '../../services/controllers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Favorite from 'material-ui/svg-icons/action/favorite';
import EditorInsertComment from 'material-ui/svg-icons/editor/insert-comment';

class QuoteItem extends Component {
  constructor(props) {
    super(props);

    this.handleLikeButton = this.handleLikeButton.bind(this);
  }

  handleLikeButton() {
    controller.likeQuote(this.props.quote, this.props.user, (data) => {
      console.log('QUOTE, ', data);
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card
          style={{
            height: 300,
            width: 300,
            display: 'inline-block',
          }}
          className="col-1-3"
        >
          <CardHeader>
            <IconButton><EditorInsertComment /></IconButton>
            <IconButton
              onClick={this.handleLikeButton}
            >
              <Favorite />
            </IconButton>
          </CardHeader>
          <CardText>
            {this.props.quote}
          </CardText>
        </Card>
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
