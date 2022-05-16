const User = require('../models/User');

function logout(session){
    delete session.user;
}

async function register(session, firstName, lastName, email, password) {
    const user = new User({
        firstName,
        lastName,
        email,
        hashedPass: password
    });
    console.log(user);
    await user.save();
    session.user = {
        id: user._id,
        email: user.email
    }
}

async function login(session, email, password) {
    const user = await User.findOne({email});
    if (user && await user.comparePassword(password)) {
        session.user = {
            id: user._id,
            email: user.email
        }
        return true;
    } else {
        throw new Error('Incorrect username or password');
    }
}

// function isAuthor(session, authorId){
//     if (authorId == session.user.id){
//         return true
//     } else {
//         return false;
//     }
// }

module.exports = () => (req, res, next) => {
    if (req.session.user){
        res.locals.user = req.session.user;
        res.locals.hasUser = true;
    }

    req.auth = {
        register: (...params) => register(req.session, ...params),
        login: (...params) => login(req.session, ...params),
        logout: () => logout(req.session)
        //isAuthor: () => isAuthor(req.session, ...params)
    };
    next();
}