const hbs = require("express-handlebars");
const express = require("express");
const session = require("express-session");

const authService = require("../services/authService");
const postService = require("../services/postsService");

module.exports = (app) => {

    app.engine('hbs', hbs.create({
        extname: '.hbs'
    }).engine);
    app.set('view engine', '.hbs');


    app.use('/static', express.static('static'));

    app.use(session({
        secret: 'Albert tainichko e pedal',
        resave: false,
        saveUninitialized: true,
        cookie: {secure: 'auto'}
    }));
    app.use(express.urlencoded({extended: true}));

    app.use(authService());
    app.use(postService());
}