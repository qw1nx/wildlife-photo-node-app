const express = require('express');
const expressConfig = require('./config/express');
const dbInit = require('./config/database');
const {isLoggedIn, isAuthorMiddleware} = require("./services/utilService");
const { body } = require('express-validator');



start();


async function start() {
    const app = express();

    expressConfig(app);
    dbInit(app);

    const { home } = require('./controllers/home')
    const { notFound } = require('./controllers/notFound');
    const create = require('./controllers/create');
    const { details } = require('./controllers/details');
    const {allPosts} = require('./controllers/allPosts')
    const edit = require('./controllers/edit');
    const { myPosts } = require('./controllers/myPosts');
    const { deletePost } = require('./controllers/delete');
    const { vote } = require('./controllers/vote');

    const { loginGet, loginPost, registerGet, registerPost, logoutGet } = require('./controllers/auth')

    app.get('/', home);

    app.get('/details/:id', details);

    app.route('/create')
        .get(isLoggedIn(), create.get)
        .post(isLoggedIn(), create.post);

    app.route('/edit/:id')
        .get(isAuthorMiddleware(), edit.get)
        .post(isAuthorMiddleware(), edit.post);

    app.route('/login')
        .get(loginGet)
        .post(loginPost);

    app.get('/allposts', allPosts);

    app.get('/delete/:id', isAuthorMiddleware(), deletePost);

    app.route('/register')
        .get(registerGet)
        .post(body('firstName')
                .isLength({min: 3}).withMessage('First name must have at least 3 characters')
                .isAlphanumeric().withMessage('Must use only english letters'),
            body('lastName')
                .isLength({min: 5}).withMessage('Last name must have at least 5 characters')
                .isAlphanumeric().withMessage('Must use only english letters'),
            body('email')
                .isEmail().withMessage('Email isn\' in correct format'),
            body('password')
                .isLength({min: 3}).withMessage('Password must be at least 3 characters long'),
            body('repeatPass')
                .custom(async(value, {req}) => {
                    if (value !== req.body.password){
                        throw new Error('Password dont\' match!')
                    }
                }).withMessage('Passwords do not match'),
            registerPost);

    app.get('/logout',isLoggedIn(),  logoutGet);

    app.get('/vote/:id/:type', isLoggedIn(), vote);

    app.get('/myposts/:id', isLoggedIn(),myPosts);

    app.get('*', notFound);

    app.listen(3000, () => console.log('Server started on port 3000'));
}

