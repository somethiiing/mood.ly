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
    const username = this.props.user;
    const quote = {
      text: this.props.quote,
      mood: this.props.mood,
    };
    controller.likeQuote(quote, username, (data) => {
      console.log('QUOTE, ', data);
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card
          style={{
            height: 350,
            width: 300,
          }}
        >
          <CardHeader
            style={{
              height: 75,
            }}
          >
            <IconButton
              style={{
                float: 'left',
              }}
            ><EditorInsertComment /></IconButton>
            <IconButton
              style={{
                float: 'right',
              }}
              onClick={this.handleLikeButton}
            >
              <Favorite />
            </IconButton>
          </CardHeader>
          <CardText
            style={{
              textAlign: 'center',
            }}
          >
            {this.props.quote}
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

QuoteItem.propTypes = {
  quote: PropTypes.element,
  mood: PropTypes.element,
  user: PropTypes.element,
  onQuoteClick: PropTypes.func,
};

export default QuoteItem;
