import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Button from 'react-bootstrap/lib/Button';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="form-group search-bar">
          <h1>how are you feeling today?</h1>
          <TextField
            onChange={this.props.handleSearchChange}
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
      </MuiThemeProvider>
    );
  }
}

Search.propTypes = {
  handleSearchChange: React.PropTypes.func.isRequired,
  handleSearchButtonClick: React.PropTypes.func.isRequired,
};

export default Search;
