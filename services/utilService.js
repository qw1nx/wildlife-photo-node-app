const bcrypt = require('bcrypt');
const Post = require('../models/Post');

function postViewModel(post){
    return {
        id: post._id,
        title: post.title,
        keyword: post.keyword,
        location: post.location,
        dateOfCreation: post.dateOfCreation,
        image: post.image,
        description: post.description,
        author: post.author,
        votes: post.votes,
        rating: post.rating
    }
}

async function hashPassword (password){
    return bcrypt.hash(password, 10);
}

async function comparePass (password, hashedPassword){
    return bcrypt.compare(password, hashedPassword);
}

function isLoggedIn(){
    return function(req, res, next){
        if (req.session.user){
            next();
        } else {
            res.redirect('/login')
        }
    }
}

function isAuthorMiddleware(){
    return async function(req, res, next){
        try{
            const post = await Post.findById(req.params.id);
            if (req.session.user.id == post.author){
                next();
            }
        } catch (e){
            console.log(e.message);
            res.redirect('/login');
        }
    }
}

module.exports = {
    postViewModel,
    hashPassword,
    comparePass,
    isLoggedIn,
    isAuthorMiddleware
}