var Post = require('../models/postModel')

exports.overview = (req, res)=>{
    res.status(200).render('posts/index',{
        title:'Posts list overview'
    })
}

exports.newPostForm = (req, res)=>{
	res.render('posts/newPostForm',{
		title:'add new post'
	})
}

exports.newPost = async (req, res) =>{
	try
	{
		const newPost = await Post.create({
			title:req.body.title,
			content:req.body.content
		})

		res.status(201).json({
			status:'success',
			data:{
				post:newPost
			}
		})
	}catch(err)
	{
		console.error(err)
	}
}