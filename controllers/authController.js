var Member = require('../models/memberModel');
const jwt = require('jsonwebtoken')
const { promisify } = require('util');
const AppError = require('../utils/appError')

exports.register = async(req, res, next)=>{

    try
    {
        const newMember = await Member.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
        })

        const token = jwt.sign({id:newMember._id}, process.env.JWT_SECRET, {
            expiresIn:process.env.JWT_EXPIRES_IN
        })

        const cookieOptions =
        {
            expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly:true                                                        
        }

        //if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

        res.cookie('jwt', token, cookieOptions)

        res.status(201).json({
            status:'success',
            token,
            data:{
                member:newMember
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

exports.login = async (req, res, next)=>{
    try
    {
        const {email, password} = req.body

        if(!email)
        {
            throw 'Email is required'
        }

        if(!password)
        {
            throw 'Password is required'
        }
        const member = await Member.findOne({email}).select('+password')
        console.log(member)
        const validPassword = member.correctPassword(password, member.password)
        console.log('valid password:',validPassword)
        if(!member || !validPassword)
        {
            throw 'Invalid email and password'
            return 
        }

        const token = jwt.sign({id:member._id}, process.env.JWT_SECRET, {
            expiresIn:process.env.JWT_EXPIRES_IN
        })

        const cookieOptions =
        {
            expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly:true                                                        
        }

        //if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

        res.cookie('jwt', token, cookieOptions)

        res.status(200).json({
            status:'success',
            token,
            data:{
                member
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

exports.isLoggedIn = async (req, res, next)=>{
   try
   {

        if(req.cookie.jwt)
        {
            //verify token

        //     const decodedToken = await promisify(jwt.verify)
        //     {
        //         req.cookie.jwt,
        //         process.env.JWT_SECRET
        //     }

        //     //check user if still exists
        //     const currentMember = await Member.findById(decodedToken.id)

        //     if(!currentMember)
        //     {
        //         //return next(new AppError('Login required',401))
        //         //res.redirect('/users/login')
        //     }
         }else
        {
            res.redirect('/users/login')
        }
    
    }catch(err)
    {
       console.error(err)
       // return next(new AppError('Login required',401))
    }
}