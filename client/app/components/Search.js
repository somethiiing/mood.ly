import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import wiki from '../services/wiki.js';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
  }

  handleSearchButtonClick() {
    const self = this;
    const query = this.state.currentSearch;
    wiki(query, (res) => {
      const randomIndex = Math.floor((Math.random() * res.length) + 1);
      self.setState({
        currMood: query,
        currQuote: res[randomIndex],
      });
    });
  }

  handleSearchChange(event) {
    this.setState({
      currentSearch: event.target.value,
    });
  }
  render() {
    return (
      <div className="search-bar form-inline">
        <div className="form-group">
          <input
            onChange={this.handleSearchChange}
            className="form-control" type="text" placeholder="how are you feeling?"
          />
          <button onClick={this.handleSearchButtonClick} value="Submit!">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => 
  return {
    search: state.search,
  };
};

const mapDispatchToProps = (dispatch) =>
  return {
    // WILL BE DETERMINED BY APP FUNCTIONALITY
  };
};

Search.propTypes = {
  handleSearchChange: React.PropTypes.func.isRequired,
  handleSearchButtonClick: React.PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
