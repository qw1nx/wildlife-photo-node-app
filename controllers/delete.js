module.exports = {
    async deletePost(req, res){
        try{
            await req.storage.deleteById(req.params.id);
            res.redirect('/allposts');
        } catch (e){
            console.log(e.message);
        }

    }
}