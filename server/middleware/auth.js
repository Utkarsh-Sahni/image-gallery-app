import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) =>{

    try {
        
        const token= req.cookies.access_token;
        if(!token) return res.status(403).send("Access Denied!");
        
        if(token.startsWith("Bearer ")) {
            token = token.slice(7).trimLeft();
        }
        
        const verified= jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        req.user= verified;
        next();
        
    } catch (err) {
        return res.status(500).json({ error: err.message});
    }
}