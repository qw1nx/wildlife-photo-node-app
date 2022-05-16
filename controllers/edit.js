module.exports = {
    async get(req, res) {
        const id = req.params.id;
        const post = await req.storage.findById(id);

        if(post.author != req.session.user.id){
            console.log('User is not author!');
            return res.redirect('/login');
        }

        if (post) {
            console.log(post);
            res.render('edit', { post } );
        } else {
            res.redirect('404');
        }
    },
    async post(req, res) {
        const id = req.params.id;
        const post = {
            title: req.body.title,
            keyword: req.body.keyword,
            location: req.body.location,
            dateOfCreation: req.body.dateOfCreation,
            image: req.body.image,
            description: req.body.description
        };

        try {
            if (await req.storage.updateById(id, post, req.session.user.id)){
                res.redirect('/login');
            } else {
                res.redirect('/details/' + id);
            }


        } catch (err) {
            console.log(err);
            res.redirect('/404');
        }
    }
}