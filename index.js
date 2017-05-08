//jshint node: true, esversion: 6
'use strict';

const express         = require('express'),
      app             = express(),
      expressSession  = require('express-session'),
      bars            = require('express-handlebars'),
      flash           = require('connect-flash'),
      pkg             = require('./package.json'),
      config          = require('./config'),
      Trello          = require('trello');

// handlebars as templating engine
app.engine('.hbs', bars({
  defaultLayout: 'layout', extname: '.hbs'
}));
app.set('view engine', '.hbs');

// set static route
app.use(express.static('assets'));

app.use(expressSession({
  secret: 'df5Jdxcx3ghCrgcjb8F565fw',
  resave: false,
  saveUninitialized: false,
  maxAge: 3600000 // 1 hour
}));

app.use(flash());

// set server port
app.set('port', process.env.PORT || 1977);

// create a new Trello object, with supplied credentials
const trello = new Trello(config.api, config.token);

// routing
require('./routes')(app, trello);

// start server
const server = app.listen(app.get('port'), () => {
  console.log(pkg.name, 'running on port', server.address().port);
})
