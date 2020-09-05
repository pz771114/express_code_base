var Member = require('../models/memberModel');
var multer = require('multer')
var multerStorage = multer.diskStorage({
    destination:(req, file, cb)=>
    {
        cb(null,'public/images/users')
    },
    filename:(req, file, cb)=>
    {
        var ext = file.mimetype.split('/')[1]
        var filename = `user-${Date.now()}.${ext}`
        cb(null, filename)
    }
})

var multerFilter = (req, file, cb)=>{
    if(file.mimetype.startsWith('image'))
    {
        cb(null, true)
    }else
    {
        cb(null, false)
        res.status(400).json({
            status:'only accept image types'
        })
    }
}

var upload = multer({
    storage:multerStorage,
    fileFilter:multerFilter
})
exports.index = (req, res)=>{
    res.status(200).render('users/index',{title:'User'})
}

exports.uploadPhoto = upload.single('photo')
exports.getUpload = (req, res)=>{
    res.render('uploadForm',{
        title:'upload form'
    })
}

exports.upload = (req, res)=>{
    console.log(req.file)
    try
    {
        res.status(200).json({
            status:'success'
        })
    }catch(err)
    {
        res.status(400).json({
            status:'fail',
            message:err
        })
    }
}

exports.signupForm = (req, res)=>{
    res.render('signupForm',{title:'New member | Sign up'})
}

exports.loginForm = (req, res)=>{
    res.render('loginForm',{title:'Member | Login'})
}

exports.getAllUsers = async (req, res)=>{
    try
    {
        const users = await User.find()

        res.status(200).json({
            status:'success',
            data:{
                users
            }
        })
    }catch(err)
    {
        res.status(400).json({
            status:'fail',
            message:err
        })
    }
}