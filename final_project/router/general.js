const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if both username and password are provided
  if (username && password) {
    // Check if this user already exists
    if (!isValid(username)) {
      // Add the new user
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  if (books[isbn] != null) {
    res.send(JSON.stringify(books[isbn], null, 4));
  } else {
    res.status(400).json({ message: "Book with the isbn" + isbn + " cannot be found." });
  }

 });
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  let author = req.params.author;

  let book = Object.values(books).filter(book => {
    return book.author === author;
  });

  if (book.length > 0) {
    res.send(JSON.stringify(book, null, 4));
  } else {
    res.status(400).json({ message: "The book with the Author: " + author + " does not exist." });
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let title = req.params.title;

  let book = Object.values(books).filter(book => {
    return book.title === title;
  });

  if (book.length > 0) {
    res.send(JSON.stringify(book, null, 4));
  } else {
    res.status(400).json({ message: "The book with the Title: " + title + " does not exist." });
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
