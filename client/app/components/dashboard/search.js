import React, { PropTypes, Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Search extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="form-group">
          <TextField
            onChange={this.props.handleSearchChange}
            className="form-control"
            hintText="how are you feeling?"
            floatingLabelText="how are you feeling?"
          />
          <br />
          <RaisedButton
            onClick={this.props.handleSearchButtonClick}
            label="submit"
            primary={Boolean(true)}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

Search.propTypes = {
  handleSearchChange: PropTypes.func.isRequired,
  handleSearchButtonClick: PropTypes.func.isRequired,
};

export default Search;
