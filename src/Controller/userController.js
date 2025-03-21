const userModel = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const SECRET_KEY =process.env.SECRET_KEY;

const signup= async(req,res)=>{
    //existing user check

    const {username,password,email} = req.body;
    try {
        const existingUser = await userModel.findOne({email:email});
        if(existingUser){
           return res.status(400).json({message:"User already exist"})
        }

         //hashing of password
        const hashedPass = await bcrypt.hash(password,10);

            //user creation
        const result =await userModel.create({
            email:email,
            password:hashedPass,
            username:username
        });
            //token creation

            const token = jwt.sign({email:result.email,id:result._id},SECRET_KEY)
            res.status(201).json({user:result,token:token})



    } catch (error) {
        
        res.status(500).json({message:"Something went wrong"})
        
    }

}

const signin = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const existingUser = await userModel.findOne({email:email});
        if(!existingUser){
          return  res.status(400).json({message:"User not found"})
        }

        const matchPass = await bcrypt.compare(password,existingUser.password)
        if(!matchPass){
          return  res.status(400).json({message:"invalid credentials"})
        }
        const token = jwt.sign({email:existingUser.email,id:existingUser._id},SECRET_KEY)
        res.status(200).json({user:existingUser,token:token})

    } catch (error) {
        console.log(error)
        res.status(400).json({message:"This is error"})
    }

}

module.exports = {signup,signin};