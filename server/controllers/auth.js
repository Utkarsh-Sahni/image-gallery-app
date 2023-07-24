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

        
        res.cookie('access_token', token, {
            httpOnly: true, // The cookie can't be accessed through JavaScript
            secure: false, // Set to true if using HTTPS
            sameSite: 'strict', // Restrict the cookie to same-site requests
            maxAge: 24*3600000, 
            domain: 'localhost', // Set the domain to localhost or your custom domain
            path: '/'// Expiry time in milliseconds (1 hour in this case)
          })
          return res.status(200).send(token);
        ;
        
    }catch(err) {
        return res.status(400).json({error: err.message});
    }
}