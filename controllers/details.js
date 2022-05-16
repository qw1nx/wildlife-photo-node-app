module.exports = {
    async details(req, res) {
        const id = req.params.id;
        const post = await req.storage.findById(id);

        const authorFullname = await req.storage.authorFullname(post.author);
        //const isAuthor = req.auth.isAuthor(post.author);

        if (req.session.user && req.session.user.id == post.author){
            post.isAuthor = true;
        }

        if (req.session.user && post.votes.includes(req.session.user.id)){
            console.log('got in HAS VOTED')
            post.hasVoted = true;
        }

        //req.session.user.id != post.author

        if (post) {
            res.render('details', { title: `${post.title}`, post, authorFullname});
        } else {
            res.redirect('/404');
        }
    }
};