module.exports = {
    async allPosts(req, res){
        try{
            const posts = await req.storage.getAll();
            //console.log(posts);
            res.render('all-posts', { posts, title: 'WildLife' });
        } catch (e){
            console.log(e.message);
            res.redirect('/');
        }

    }
}