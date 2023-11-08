import passport from "passport";
import local from "passport-local";
import UserManager from "../dao/mongo/usersManager.js";
import GithubStrategy from "passport-github2";
import jwt from "passport-jwt";
import { secretToken } from "../utils/jwt.js";
import cookieExtrator from "../utils/cookieExtractor.js";

const JWTStrategy = jwt.Strategy;

const userManager = new UserManager();
local.Strategy;

const localStrategy = () => {
  passport.use(
    "register",
    new local.Strategy(
      {
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        console.log(req.body);
        const getUserByUserName = await userManager.getUsersByEmail(email);

        if (!getUserByUserName) return done(null, false);

        const createUser = await userManager.createNewUser({
          name,
          lastName,
          username,
          email,
          password,
          role: username == "admincoder@coder.com" ? "admin" : "user",
        });

        return done(null, createUser.toObject());
      }
    )
  );

  passport.use(
    "login",
    new local.Strategy(
      {
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const validateUser = await userManager.validateUser(email, password);
        console.log(validateUser);
        if (!validateUser) return "Email o contraseña no valido!";

        return done(null, validateUser);
      }
    )
  );

  //Estrategia Github

   passport.use(
     "github",
     new GithubStrategy(
       {
         clientID: "Iv1.ac253cfc0624b1d3",
         clientSecret: "9384c6b2447a217e6f708e482771b5cf1db8c827",
         callbackURL: "http://localhost:8080/api/auth/callback",
       },
       async (accessToken, refreshToken, profile, done) => {

         console.log(profile);
         let username = profile._json.login;

         const user = await userManager.getUsersByEmail(username);

         if (user) return done(null, user);

         const newUser = await userManager.createNewUser({
           name: profile._json.name?.split("")[0]?? "Usuario",
           lastName: profile._json.name?.split("")[1]??profile._json.id,
           username,
           email: profile._json.email + profile._json.id + "coder",
           password: "",
           role: profile._json.username == "admincoder@coder.com" ? "admin" : "user",
         });

         done (null,newUser);
       }
     )
   );

  //busqueda de usuario mediante token
  //jwt
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtrator]),
        secretOrKey: secretToken,
      },
      async (payload, done) => {
        console.log(payload);
        const userContent = await userManager.getId(payload.sub);
        if (!userContent) return done("contenido no valido!");

        return done(null, userContent);
      }
    )
  );

  passport.serializeUser((userContent, done) => {
    console.log(userContent);
    done(null, userContent.email);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userManager.getId(id);
      done(null, user);
    } catch (e) {
      done(null, false);
    }
  });
};
export default localStrategy;
