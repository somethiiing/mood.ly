import bodyParser from 'body-parser';

export default (app, express) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static(`${__dirname}/../../`));
  app.set('views', `${__dirname}/../views`);
  app.set('view engine', 'jsx');
  app.engine('jsx', require('express-react-views').createEngine());
};
