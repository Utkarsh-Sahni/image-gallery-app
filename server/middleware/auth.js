import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) =>{

    try {
        const token=req.headers.authorization;
        console.log('token',token);
        if(!token) return res.status(403).send("Access Denied!");
        

        const verified= jwt.verify(token.split(' ')[1], process.env.JWT_SECRET_KEY);
        
        req.user= verified;
        next();
        
    } catch (err) {
        return res.status(500).json({ error: err.message});
    }
}