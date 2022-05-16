 module.exports = {
     async myPosts(req, res){
         try{
             const posts = await req.storage.getAllPostsByAuthor(req.session.user.id);
             //console.log(posts);

             posts.map(async e => {
                 e.authorFullName = await req.storage.authorFullname(req.session.user.id);
             })
             res.render('my-posts', { posts, title: 'WildLife' });
         } catch (e){
             console.log(e.message);
             res.redirect('/');
         }

     }
 }