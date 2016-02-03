var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

var ingredients = require('./routes/ingredients.js');

app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/restaurant');

app.get('/ingredients/', ingredients.home);
app.get('/ingredients/data', ingredients.getData);
app.get('/ingredients/update', ingredients.create);

app.listen(3000);