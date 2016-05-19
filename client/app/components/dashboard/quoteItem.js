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
    let fontStyle = {
      textAlign: 'center',
      fontFamily: 'Sniglet, cursive',
    };
    if (this.props.quote.length <= 100) {
      fontStyle['font-size'] = '200%';
    }
    if (this.props.quote.length > 100 && this.props.quote.length <= 200) {
      fontStyle['font-size'] = '150%';
    }
    if (this.props.quote.length > 200 && this.props.quote.length <= 400) {
      fontStyle['font-size'] = '100%';
    }
    if (this.props.quote.length > 400) {
      fontStyle['font-size'] = '85%';
    }


    return (
      <MuiThemeProvider>
        <Card
          style={{
            height: 350,
            width: 300,
            margin: '0 auto',
            border: '4px solid #424242',
            borderRadius: '25px',
            boxShadow: 'none',
          }}
        >
          <CardHeader
            style={{
              height: 75,
            }}
          >
            <IconButton
              disableTouchRipple={Boolean(true)}
              style={{
                float: 'left',
                color: '#bfefff',
              }}
            ><EditorInsertComment /></IconButton>
            <IconButton
              style={{
                float: 'right',
              }}
              onClick={this.handleLikeButton}
            >
              <Favorite
                color={'#4f94cd'}
                hoverColor={'#bfefff'}
              />
            </IconButton>
          </CardHeader>
          <CardText
            style={fontStyle}
          >
            {this.props.quote}
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

QuoteItem.propTypes = {
  user: React.PropTypes.object,
  mood: React.PropTypes.string,
  quote: React.PropTypes.string,
  onQuoteClick: React.PropTypes.func,
};

export default QuoteItem;
