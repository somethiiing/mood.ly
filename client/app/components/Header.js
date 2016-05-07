import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

class Header extends Component {
  constructor(props) {
    super(props);

    this.onLoginClick = this.onLoginClick.bind(this);
    this.onSignUpClick = this.onSignUpClick.bind(this);
  }

  onSignUpClick() {
    this.setState({
      showSignUp: !this.state.showSignUp,
    });
  }

  onLoginClick() {
    this.setState({
      showLogin: !this.state.showLogin,
    });
  }

  render() {
    // Add handler for logout  
    return (
      <div className="header">
        <div>
          <ul className="nav-list">
            <button onClick={this.onLoginClick}>login</button>
            <button onClick={this.onSignUpClick}>sign up</button>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => 
  {
    user: state.user,
  };

const mapDispatchToProps = (dispatch) =>
  {
    // WILL BE DETERMINED BY APP FUNCTIONALITY
  };

Header.propTypes = {
  user: React.PropTypes.object,
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
