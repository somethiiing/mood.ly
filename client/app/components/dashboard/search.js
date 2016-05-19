import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Button from 'react-bootstrap/lib/Button';
import { Card, CardText } from 'material-ui/Card';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card
          style={{
            margin: '50 auto',
            border: '4px solid #424242',
            borderRadius: '25px',
            boxShadow: 'none',
          }}
          className="search-bar"
        >
          <CardText>
            <div className="form-group search-bar-content">
              <h1>how are you feeling today?</h1>
              <TextField
                onChange={this.props.handleSearchChange}
                inputStyle={{
                  textAlign: 'center',
                  fontFamily: 'Sniglet, cursive',
                }}
                underlineStyle={{
                  borderColor: '#424242',
                  borderWidth: 2,
                }}
                underlineFocusStyle={{
                  borderColor: '#bfefff',
                  borderWidth: 2,
                }}
              />
              <br />
              <br />
              <Button
                bsSize="large"
                className="primary-button"
                onClick={this.props.handleSearchButtonClick}
              >
              submit
              </Button>
            </div>
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

Search.propTypes = {
  handleSearchChange: React.PropTypes.func.isRequired,
  handleSearchButtonClick: React.PropTypes.func.isRequired,
};

export default Search;
