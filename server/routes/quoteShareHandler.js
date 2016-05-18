import React from 'react';
import ReactDOMServer from 'react-dom/server';
import template from '../views/default';
import Title from '../../client/app/components/landing/title';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Favorite from 'material-ui/svg-icons/action/favorite';
import EditorInsertComment from 'material-ui/svg-icons/editor/insert-comment';
import Footer from '../../client/app/components/Footer';

const html = (body) => {
  let data = '';
  if (body.type === 'GIF') {
    console.log('GIF', body);
    data = `<img src="${body.url}" alt>`;
  }
  if (body.type === 'MUSIC') {
    console.log('MUSIC', body);
    data = `<iframe src={'https://youtube.com/embed/${body.videoId}'} height="200px" width="250px" />`;
  }

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
              }}
            >
              <CardHeader
                style={{
                  height: 75,
                }}
              >
              </CardHeader>
              <CardText
                style={{
                  textAlign: 'center',
                }}
              >
                {body}
              </CardText>
            </Card>
          </MuiThemeProvider>
        </div>
      </MuiThemeProvider>
      <Footer />
    </div>
  );
};

export default html;
