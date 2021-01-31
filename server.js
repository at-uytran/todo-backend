var express = require('express');
var serverEnv = process.env.SERVER_ENV || 'development';
var fs = require('fs');
var log = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv').config('./.env');
var properties = require('./config/properties');
var db = require('./config/database');
var apiRoutes = require('./config/api.routes');
var app = express();
var params = require('strong-params')
app.use(params.expressMiddleware())

var whitelist = properties.CORS;
var corsOptions = {
  origin:  (origin, callback) =>  {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(null, true)
    }
  }
}

app.use(cors(corsOptions));
var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({extended:true});
var router = express.Router();
db();
app.use(log('combined', {stream: fs.createWriteStream(`./log/server_${serverEnv}.log`, {flags: 'a'})}));
app.use(log('dev'));
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
app.use('/api',router);
apiRoutes(router);

app.listen(properties.PORT, (req, res) => {
  console.log(`Server is running on ${properties.PORT} port.`);
})
