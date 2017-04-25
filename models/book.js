var mongoose = require('mongoose');

// book schema
var bookSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	genre: {
		type: String,
		required: true
	},
	des: {
		type: String
	},
	author: {
		type: String,
		required: true
	},
	publisher: {
		type: String,
		required: true
	},
	page: {
		type: String
	},
	img_url: {
		type: String
	},
	buy_url: {
		type: String
	},
	create_date: {
		type: Date,
		default: Date.now
	}
});

var Book = module.exports = mongoose.model('Book', bookSchema);

// get Books

module.exports.getBooks = function (callback, limit) {
	Book.find(callback).limit(limit);
}

// findbyid 是mongonse的一个方法
// get book
module.exports.getBookById = function (id, callback) {
	Book.findById(id, callback);
}

// add book
module.exports.addBooks = function (book, callback) {
	Book.create(book, callback);
}

module.exports.updateBook = function (id, book, options, callback) {
	var query = {_id: id};
	var update = {
		title: book.title,
		genre: book.genre,
		des: book.des,
		author: book.author,
		publisher: book.publisher,
		pages: book.pages,
		img_url: book.img_url,
		buy_url: book.buy_url
	}
	Book.findOneAndUpdate(query, update, options, callback);
}