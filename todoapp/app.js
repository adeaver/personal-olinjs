var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/jstodo');

var index = require('./routes/index.js');
var items = require('./routes/todo.js');

app.get('/', index.home);
app.get('/remove/:id', items.removeItem);
app.get('/complete/:id', items.completeItem);

app.post('/add', items.addItem);
app.post('/update', items.editItem);

app.listen(3000);