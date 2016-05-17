import React from 'react';
import controller from '../../services/controllers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Favorite from 'material-ui/svg-icons/action/favorite';
import EditorInsertComment from 'material-ui/svg-icons/editor/insert-comment';

class QuoteItem extends React.Component {
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
            margin: '0 auto',
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
  quote: React.PropTypes.string,
  mood: React.PropTypes.string,
  user: React.PropTypes.object,
  onQuoteClick: React.PropTypes.func,
};

export default QuoteItem;
