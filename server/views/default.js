// import React from 'react';

// class HelloMessage extends React.Componenet {
//   render() {
//     return <div>Hello {this.props.name}</div>;
//   }
// }
const HelloMessage = (html) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
        <link rel="stylesheet" href="../../client/app/styles/style.css" />

        <link href='https://fonts.googleapis.com/css?family=Sniglet' rel='stylesheet' type='text/css'>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">

        <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.1/animate.min.css">

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">

        <title>Welcome to Mood.ly</title>
        <meta name="description" content="A place to explore your mood" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js"></script>
      </head>
      <body>
        <div id="app"><div>${html}</div></div>
      </body>
    </html>
  `;
};

export default HelloMessage;
