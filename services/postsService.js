const Post = require('../models/Post');
const User = require('../models/User');
const { postViewModel } = require('../services/utilService')

async function getAll(){
    const posts = await Post.find();
    return posts.map(postViewModel);
}

async function findById(id){
    const post = await Post.findById(id);
    if (post) {
        return postViewModel(post);
    } else {
        return undefined;
    }
}

async function createPost(post){
    const input = postViewModel(post);
    await Post.create(input);
}

async function deleteById(id){
    await Post.findByIdAndDelete(id);
}

async function updateById(id, post, authorId) {
    const instance = await Post.findById(id);

    if (instance.author != authorId){
        return false;
    }

    instance.id = post._id;
    instance.title = post.title;
    instance.keyword = post.keyword;
    instance.location = post.location;
    instance.dateOfCreation = post.dateOfCreation;
    instance.image = post.image;
    instance.description = post.description;

    await instance.save();
}

async function authorFullname(authorId){
    try{
        console.log(authorId);
        const user = await User.findById(authorId);
        console.log(user);
        return `${user.firstName} ${user.lastName}`;
    } catch (e){
        console.log(e.message);
    }

}

async function vote(id, value, voterId){
    const post = await Post.findById(id);
    post.rating += value;
    post.votes.push(voterId);
    await post.save();
}

async function getAllPostsByAuthor(authorId){
    const posts = await Post.find({author: authorId});
    return posts.map(postViewModel);
}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        findById,
        createPost,
        deleteById,
        updateById,
        authorFullname,
        getAllPostsByAuthor,
        vote
    };
    next();
}