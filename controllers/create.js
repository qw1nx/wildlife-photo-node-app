// module.exports = {
//     get(req, res) {
//         res.render('create', { title: 'Create Listing' });
//     },
//     async post(req, res) {
//         const car = {
//             name: req.body.name,
//             description: req.body.description,
//             imageUrl: req.body.imageUrl || undefined,
//             price: Number(req.body.price),
//             accessories: [],
//             owner: req.session.user.id
//         };
//
//         try{
//             await req.storage.createCar(car);
//             res.redirect('/');
//         } catch (e){
//             console.log(e);
//             res.redirect('/');
//         }
//     }
// };

module.exports = {
    get(req, res){
        res.render('create');
    },
    async post(req, res){

        const post = {
            title: req.body.title,
            keyword: req.body.keyword,
            location: req.body.location,
            dateOfCreation: req.body.dateOfCreation,
            image: req.body.image,
            description: req.body.description,
            author: req.session.user.id
        }
        console.log(post);
        try{
            console.log(post);
            await req.storage.createPost(post);
            res.redirect('/');
        } catch (e){
            console.log(e);
            res.redirect('/');
        }
    }
}