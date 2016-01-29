var express = require('express');
var exphbs = require('express-handlebars');
var index = require('./routes/index');
var bodyParser = require('body-parser');
var app = express();

app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', index.home);
app.get('/data', index.getData);
app.get('/delete', index.removeData);
app.post('/add', index.addData);

app.listen(3000);