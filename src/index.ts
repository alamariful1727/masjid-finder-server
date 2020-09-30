import App from './config/express';
import config = require('./config/env/index');

// start server
App.listen(config.PORT, () => {
  console.info(`server started on port: ${config.PORT} (${config.NODE_ENV})`);
});

module.exports = App;
