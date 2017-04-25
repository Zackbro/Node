var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

Genre = require('./models/genre.js');
Book = require('./models/book.js')

// 连接到mongoose 
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

app.get('/', function (req, res) {
	res.send('hello');
});

// genre
// get genre
app.get('/api/genres', function(req, res){
	Genre.getGenres(function(err, genres){
		if (err) {
			throw err;
		}
		res.json(genres);
	})
});
// add genre
app.post('/api/genres', function(req, res){
	var genre = req.body;
	Genre.addGenre(genre, function(err, genre){
		if (err) {
			throw err;
		}
		res.json(genre);
	})
});

// update
app.put('/api/genres/:_id', function(req, res){
	var id = req.params._id;
	var genre = req.body;
	Genre.updateGenre(id, genre, {}, function(err, genre){
		if (err) {
			throw err;
		}
		res.json(genre);
	})
});
// remove genre
app.delete('/api/genres/:_id', function(req, res){
	var id = req.params._id;
	Genre.removeGenre(id, function(err, genre){
		if (err) {
			throw err;
		}
		res.json(genre);
	})
});

// book
// the same as before
app.get('/api/books', function(req, res){
	Book.getBooks(function(err, books){
		if (err) {
			throw err;
		}
		res.json(books);
	})
})

app.get('/api/books/:_id', function(req, res){
	Book.getBookById(req.params._id, function(err, book){
		if (err) {
			throw err;
		}
		res.json(book);
	})
})

app.post('/api/books', function(req, res){
	var book = req.body;
	Book.addBooks(book, function(err, book){
		if (err) {
			throw err;
		}
		res.json(book);
	})
});

app.put('/api/books/:_id', function(req, res){
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {}, function(err, book){
		if (err) {
			throw err;
		}
		res.json(book);
	})
});

app.listen(3000);

console.log('running on port 3000');