import User from "../models/User";
import  jwt  from "jsonwebtoken";
import config from "../config";
import Rol from "../models/Rol";

export const signUp = async (req, res) => {

    const {username, password, roles} = req.body;
    
    const newUser = new User({
        username, 
        password: await User.encryptPassword(password)
    })

    if(roles){
       const foundRoles = await Rol.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id)
    }else{
        const role = await Rol.findOne({name: "user"})
        newUser.roles = [role._id];
    }

    const saveUser = await newUser.save();

    const token = jwt.sign({id: saveUser._id}, config.SECRET, {
        expiresIn:86400 //24 hours
    })

    res.json({token})
}


export const signin = async (req, res) => {
    
    const userFound = await User.findOne({username: req.body.username}).populate("roles");
    if(!userFound) return res.status(400).json({message: 'User not found'})

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if(!matchPassword) return res.status(401).json({token: null, message: 'invalid password'})
    
    const token = jwt.sign({id: userFound._id}, config.SECRET,{
        expiresIn: 86400
    })

    res.json({token})

}