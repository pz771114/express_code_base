exports.index = (req, res)=>{
    res.status(200).render('index',{
        title:'Home page'
    })
}