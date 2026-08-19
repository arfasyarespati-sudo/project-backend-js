const express = require('express');
const port = 3000;
const app = express();
const bcrypt = require('brcypt');

app.use(express.json());

let users = [];
let notes = [];

const requireAuth = (req, res, next) => {
    const { username } = req.headers;
    const userExists = user.find(u => u.username === username);

    if (!userExists) {
        return res.status(401).json({ message: 'Unauthorized. Please register or login first'})
    }
    req.currentuser
}

