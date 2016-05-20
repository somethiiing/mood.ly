import React from 'react';
import ReactDOMServer from 'react-dom/server';
import template from '../views/default';
import Title from '../../client/app/components/landing/title';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardHeader, CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Favorite from 'material-ui/svg-icons/action/favorite';
import Headset from 'material-ui/svg-icons/hardware/headset';
import EditorInsertComment from 'material-ui/svg-icons/editor/insert-comment';
import Footer from '../../client/app/components/Footer';

const html = (body) => {
  return ReactDOMServer.renderToString(
    <div>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="landing-header container">
          <h3 className="landing-title">mood.ly</h3>
          <div className="landing-buttons">
          </div>
          <br />
          <br />
          <br />
          <br />
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
              <IconButton
                disableTouchRipple={Boolean(true)}
                style={{
                  float: 'left',
                }}
              ><Headset /></IconButton>
              <CardHeader
                style={{
                  height: 75,
                }}
              >
              </CardHeader>
              <CardMedia>
                <iframe src={`https://youtube.com/embed/${body}`} height="200px" width="250px" />
              </CardMedia>
            </Card>
          </MuiThemeProvider>
        </div>
      </MuiThemeProvider>
      <Footer />
    </div>
  );
};

export default html;
