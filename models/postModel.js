const mongoose = require('mongoose')
const slugify = require('slugify')
const postSchema = new mongoose.Schema({
	title:
	{
		type:String,
		require:[true,'A post must have a name'],
		trim:true,
		maxlength:[40,'Title can not be more than 40 characters']
	},
	slug:{
		type:String
	},
	content:
	{
		type:String
	},
	author:{
		type:String
	},
	createdTime:{
		type:Date,
		default:Date.now()
	},
	modifiedTime:{
		type:Date
	}
	
})

postSchema.pre('save', function(next){
	this.slug = slugify(this.title, {lower:true})
	this.author = 'admin'
	next()
})
const Post = mongoose.model('Post', postSchema)

module.exports = Post