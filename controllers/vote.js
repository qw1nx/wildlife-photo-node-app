module.exports = {
    async vote(req, res){
        const id = req.params.id;
        const value = req.params.type;
        if (value == 'upvote'){
            try{
                await req.storage.vote(id, 1, req.session.user.id);
                res.redirect('/details/' + id);
            } catch (e){
                console.log(e.message)
                res.redirect('/details/' + id);
            }
        } else if (value == 'downvote'){
            try{
                await req.storage.vote(id, -1, req.session.user.id);
                res.redirect('/details/' + id);
            } catch (e){
                console.log(e.message)
                res.redirect('/details/' + id)
            }
        } else {
            res.redirect('/404');
        }
    }
}