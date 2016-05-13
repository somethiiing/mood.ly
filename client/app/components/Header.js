import React, { PropTypes, Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import SocialPersonOutline from 'material-ui/svg-icons/social/person-outline';

// const muiTheme = getMuiTheme({
//   palette: {
//     accent1Color: blueA400,
//   },
// });

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valueSingle: null,
    };
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
      <MuiThemeProvider>
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
              <MenuItem value="1" primaryText="my profile" leftIcon={<SocialPersonOutline />} />
              <MenuItem value="2" primaryText="logout" leftIcon={<NavigationClose />} />
            </IconMenu>
          }
          titleStyle={{
            'text-align': 'left',
          }}
        />
      </MuiThemeProvider>
    );
  }
}

export default Header;
