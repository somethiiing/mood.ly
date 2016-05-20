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
              <CardHeader
                style={{
                  height: 75,
                }}
              >
                <IconButton
                  disableTouchRipple={Boolean(true)}
                  style={{
                    float: 'left',
                    color: '#bfefff',
                  }}
                ><EditorInsertComment /></IconButton>
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
