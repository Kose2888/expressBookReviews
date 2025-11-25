const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  users.forEach(user => {
    if (user.username === username) {
      return true;
    };
    return false;
  })
}

const authenticatedUser = (username, password) => {
  // Filter array for user with same username and password
  let validusers = users.filter(user => {
    return (user.username === username && user.password === password);
  })
  if (validusers.length > 0) {
    return true; // Found a user
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if username or password is missing
  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }

  // Authenticate user
  if (authenticatedUser(username, password)) {
    // Generate JWT access token
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 }); // access Token expires in 1 hour

    // Store access and token username in session
    req.session.authorization = {
      accessToken, username
    }
    return res.status(200).send("User successfully loggen in");
  } else {
    return res.status(208).json({ message: "Invalid Login. Check username and passsword." });
  }


});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
