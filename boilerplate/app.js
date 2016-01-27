var express = require('express');
var exphbs = require('express-handlebars');
var index = require('./routes/index');
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', index.home);

app.listen(3000);