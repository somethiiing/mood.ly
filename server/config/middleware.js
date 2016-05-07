import bodyParser from 'body-parser';

export default (app, express) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static(`${__dirname}/../../`));
};
