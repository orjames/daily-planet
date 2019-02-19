var express = require('express');
var fs = require('fs');
var methodOverride = require('method-override');
var app = express();

app.set('view engine', 'ejs'); // sets up view engine to use ejs
app.use(express.static('static')); // tells express to find all static files like css images
app.use(express.urlencoded({extended: false})); // sets up body parser which is utility built into express and it looks at form body data, grabs all the key value pair from your form and sends it back to the server
app.use(methodOverride('_method'));

app.get('/', function(req, res) {
    res.send('working');
});

app.get('/articles', function(req, res) {
    var articles = fs.readFileSync('./articles.json');
    var articlesData = JSON.parse(articles);
    res.render('articles/index', {myArticles: articlesData});
});

// opens the new article page
app.get('/articles/new', function(req, res) {
    res.render('articles/new');
});

// posts a new article
app.post('/articles', function(req, res) {
    console.log('hit post article');
    var articles = fs.readFileSync('./articles.json');
    articles = JSON.parse(articles);
    articles.push(req.body);
    fs.writeFileSync('./articles.json', JSON.stringify(articles));
    res.redirect('/articles');
});

// show one article
app.get('/articles/:id', function(req, res) {
    var articles = fs.readFileSync('./articles.json');
    var articlesData = JSON.parse(articles);
    var articleIndex = parseInt(req.params.id);
    res.render('articles/show', {myArticle: articlesData[articleIndex]}); // myArticles is the name of the key value pair 
});

// deletes an article
app.delete('/articles/:id', function(req, res) {
    var articles = fs.readFileSync('./articles.json');
    articles = JSON.parse(articles);
    articles.splice(parseInt(req.params.id), 1);
    fs.writeFileSync('./articles.json', JSON.stringify(articles));
    res.redirect('/articles');
});

app.get('/articles/:id/edit', function(req, res) {
    var articles = fs.readFileSync('./articles.json');
    articles = JSON.parse(articles);
    var articleIndex = parseInt(req.params.id);
    res.render('articles/edit', {article: articles[articleIndex], articleId: articleIndex});
});

app.put('/articles/:id', function(req, res) {
    var articles = fs.readFileSync('./articles.json');
    articles = JSON.parse(articles);
    var articleId = parseInt(req.params.id);
    articles[articleId].title = req.body.title;
    articles[articleId].body = req.body.body;
    fs.writeFileSync('./articles.json', JSON.stringify(articles));
    res.redirect('/articles/' + articleId);
});

app.listen(3003);