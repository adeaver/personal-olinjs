var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

var index = require('./routes/index');
var getData = require('./routes/getdata');
var addData = require('./routes/adddata');
var removeData = require('./routes/removedata');

app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

mongoose.connect('mongodb://localhost/nodetest');

app.get('/', index.home);
app.get('/data', getData.getData);
app.get('/delete', removeData.removeData);
app.post('/add', addData.addData);

app.listen(3000);