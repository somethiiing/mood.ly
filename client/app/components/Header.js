import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import SocialPersonOutline from 'material-ui/svg-icons/social/person-outline';
import Home from 'material-ui/svg-icons/action/home';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// const muiTheme = getMuiTheme({
//   palette: {
//     accent1Color: blueA400,
//   },
// });

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueSingle: null,
    };
    
    this.handleLogoutButtonClick = this.handleLogoutButtonClick.bind(this);
    this.handleProfileButtonClick = this.handleProfileButtonClick.bind(this);
  }

  handleLogoutButtonClick() {
    this.props.logout();
  }

  handleProfileButtonClick() {
    this.props.profile();
  }

  handleChangeSingle(event, value) {
    this.setState({
      valueSingle: value,
    });
  }

  handleOpenMenu() {
    this.setState({
      openMenu: true,
    });
  }

  handleOnRequestChange(value) {
    this.setState({
      openMenu: value,
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <AppBar
          title="mood.ly"
          showMenuIconButton={false}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><Menu /></IconButton>
              }
              onChange={this.handleChangeSingle}
              value={this.state.valueSingle}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem
                value="1"
                primaryText="dashboard"
                onClick={this.handleMoodlyClick}
                leftIcon={<Home />}
              />
              <MenuItem
                value="2"
                primaryText="profile"
                onClick={this.handleProfileButtonClick}
                leftIcon={<SocialPersonOutline />}
              />
              <MenuItem
                value="3"
                primaryText="logout"
                onClick={this.handleLogoutButtonClick}
                leftIcon={<NavigationClose />}
              />
            </IconMenu>
          }
          titleStyle={{
            textAlign: 'left',
          }}
        />
      </MuiThemeProvider>
    );
  }
}

Header.propTypes = {
  logout: React.PropTypes.func,
  profile: React.PropTypes.func,
  dashboard: React.PropTypes.func,
};

export default Header;
