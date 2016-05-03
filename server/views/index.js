const renderFullPage = function(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/client/styles/style.css" />

        <link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">

        <title>Welcome to Mood.ly</title>
        <meta name="description" content="A place to explore your mood" />
      </head>
      <body>
        <div id="app"><div>${html}</div></div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/client/bundle.js"></script> 
      </body>
    </html>
  `
}

export default renderFullPage;