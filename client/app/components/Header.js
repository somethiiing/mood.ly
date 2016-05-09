import React, { PropTypes, Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="header">
        <div>
          <ul className="navlist">
            <button>home</button>
            <button onClick={this.onLoginClick}>login</button>
            <button onClick={this.onSignUpClick}>sign up</button>
          </ul>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  onSignUpClick: PropTypes.func.isRequired,
};

export default Header;
