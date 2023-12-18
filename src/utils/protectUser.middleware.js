import config from "../env.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    const cookie = req.cookies["coderCookieToken"];
    if (cookie) {
        const user = jwt.verify(cookie,process.env.PRIVATE_KEY);
        if (user) {
          req.session.user = user
          return next();
        }
      } else {
        res.redirect('/');
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && (req.user.role === 'admin'|| req.user.role === 'premium') ){
        next();
        
    } else {
        res.status(403).json({ message: 'Acceso no autorizado.' });
    }
};

const adminOrPremium = (req, res, next) => {
    const user = req.user;
    if (user.role !== 'admin' && user.role !== 'premium') {
        res.status(403).json({
            message: 'Forbidden'
        });
    } else {
        next();
    }
}

const userOrPremium = (req, res, next) => {
    const user = req.user;
    if (user.role !== 'usuario' && user.role !== 'premium') {
        res.status(403).json({
            message: 'Forbidden'
        });
    } else {
        next();
    }
}

const adminCredentials = (email, password) => {
    if (email === config.adminName && password === config.adminPassword){
        return true
    }
};

const userAdminControl = (req,res,next)=>{
    if(req.session.user.email != config.adminName){
        next()
    }else{
        res.status(403).json({ message: 'Acceso no autorizado.' });
    }
    } 

const generateRandomString = (num) => {
        return [...Array(num)].map(() => {
            const randomNum = ~~(Math.random() * 36);
            return randomNum.toString(36);
        })
            .join('')
            .toUpperCase();
    }
    
const createHash = password => {
        const saltRounds = 10;
        return bcrypt.hashSync(password, saltRounds)
    }
export { isAuthenticated, isAdmin, adminCredentials,userAdminControl,generateRandomString,createHash ,adminOrPremium,userOrPremium};


// export default (role) => (req, res) => {
//     if (req.user && req.user.role !== role)
//       return res.status(403).send({ error: true, msg: "no posees los permisos" });
    
//   };

