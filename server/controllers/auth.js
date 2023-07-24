import bcrypt from 'bcrypt';
import  User  from '../models/User.js';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
        } = req.body;
        const salt= await bcrypt.genSalt();
        const passwordHash= await bcrypt.hash(password, salt);

        const newUser= new User({
            username,
            email,
            password: passwordHash,
        });
        
        const savedUser= await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error : err.message});
    }
}

export const login = async( req, res) => {
    try{

        const {email, password} = req.body;
        const user=  await User.findOne({ email: email});
        
        if(!user) return res.status(400).json({ msg: "User does not exist"});
        
        const isMatch= await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "Wrong Password"});
        
        const token= jwt.sign({id : user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '24h'});
        delete user.password;
        
          return res.status(200).json({token});
        ;
        
    }catch(err) {
        return res.status(400).json({error: err.message});
    }
}