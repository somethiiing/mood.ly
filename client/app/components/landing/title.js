import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import Button from 'react-bootstrap/lib/Button';

class Title extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnMoodlyClick = this.handleOnMoodlyClick.bind(this);
  }

  handleOnMoodlyClick() {
    this.props.dashboard();
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="landing-header container">
          <h3 className="landing-title" onClick={this.handleOnMoodlyClick}>mood.ly</h3>
          <div className="landing-buttons">
            <Button bsSize="large" className="landing-button" href="#about">about</Button>
            <Button bsSize="large" className="landing-button" href="#signin">sign in</Button>
          </div>
          <h1>mood.ly</h1>
          <h2>a place to explore your mood</h2>
          <br />
          <br />
          <br />
          <br />
          <NavigationArrowDownward
            color="#424242"
            style={{
              width: 40,
              height: 40,
            }}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

Title.propTypes = {
  dashboard: React.PropTypes.func,
};

export default Title;
