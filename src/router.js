const express = require('express');
const router = express.Router();
const multer = require("multer");
const jwt = require('jsonwebtoken');
const { log } = require('./helpers');
require('dotenv').config();

const PersonController = require(`./controllers/PersonController`);
const UserController = require(`./controllers/UserController`);
const CheckinController = require(`./controllers/CheckinController`);


function auth(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.API_SECRET, function (err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        log(decoded.user, { path: req.originalUrl });
        next();
    });
}


// Persons ----------------------------------------------------------------
router.get('/person/:id', auth, async (req, res) => {
    const response = await (new PersonController()).find({ id: Number(req.params.id) })
    res.send(response);
});

router.post('/person', auth, async (req, res) => {
    const response = await (new PersonController()).save({ ...req.body, files: req.files });
    res.send(response);
});

router.post('/person/list', auth, async (req, res) => {
    const response = await (new PersonController()).list();
    res.send(response);
});

// Login ----------------------------------------------------------------
router.post('/login', async (req, res) => {
    const user = await (new UserController()).userExists(req.body);
    if (!user)
        return res.send({ auth: false, message: 'Invalid username or password' });

    let token = jwt.sign({ user: user.id }, process.env.API_SECRET, { expiresIn: 3000 });
    log(user.id, { path: req.originalUrl });

    return res.send({ auth: true, token: token, message: `Bem Vindo, ${user.login}!` });
});

// Users ----------------------------------------------------------------
router.post('/user', auth, async (req, res) => {
    const response = await (new UserController()).save(req.body);
    res.send(response);
});

// Checkin ----------------------------------------------------------------
router.post('/match', auth, async (req, res) => {
    const response = await (new CheckinController()).findMatch(req.files[0]);
    res.send(response);
});








module.exports = router;