var express = require('express');
var fs = require('fs');
var app = express();

app.set('view engine', 'ejs'); // sets up view engine to use ejs
app.use(express.static('static')); // tells express to find all static files like css images
app.use(express.urlencoded({extended: false})); // sets up body parser which is utility built into express and it looks at form body data, grabs all the key value pair from your form and sends it back to the server

app.get('/', function(req, res) {
    res.send('working');
});

app.get('/articles', function(req, res) {
    var articles = fs.readFileSync('./articles.json');
    var articlesData = JSON.parse(articles);
    console.log(articlesData);
});

app.listen(3003);