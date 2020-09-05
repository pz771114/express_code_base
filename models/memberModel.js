const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const memberSchema = new mongoose.Schema({
	name:
	{
		type:String,
		require:[true,'A user must have a name'],
		trim:true,
		maxlength:[40,'Name can not be more than 40 characters']
	},
	email:
	{
		type:String,
		require:[true, 'A user must have an email'],
		unique:true,
		validate:[validator.isEmail, 'Invalid email format']
	},
	password:
	{
		type: String,
   	 	required: [true, 'Please provide a password'],
   		minlength: 6,
    	select: false
	}
})

memberSchema.pre('save',async function(next){
	this.password = await bcrypt.hash(this.password, 12)

	next()
})

memberSchema.methods.correctPassword = async function(inputPassword, hasedPassword)
{
	return await bcrypt.compare(inputPassword, hasedPassword)
}

const Member = mongoose.model('Member', memberSchema)

module.exports = Member