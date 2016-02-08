var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

var ingredients = require('./routes/ingredients.js');
var orders = require('./routes/orders.js');
var kitchen = require('./routes/kitchen.js');
var main = require('./routes/index.js');

app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/restaurant');

app.get('/', main.home);

app.get('/ingredients/', ingredients.home);
app.get('/ingredients/data', ingredients.getData);
app.get('/ingredients/update', ingredients.create);

app.get('/order', orders.home);
app.get('/order/add', orders.add);
app.get('/order/remove', orders.remove);

app.get('/kitchen', kitchen.home);

app.listen(3000);