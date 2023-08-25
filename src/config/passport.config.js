import passport from "passport";
import local from "passport-local";
import UserManager from "../dao/mongo/usersManager.js";
import GithubStrategy from "passport-github2";
const userManager = new UserManager();
local.Strategy;

const localStrategy = () => {

  passport.use(
  
    "register",
    new local.Strategy(
      {
        passReqToCallback: true,
     
      },
      async (req, username, password, done) => {
        const getUserByUserName = await userManager.getUsuarioByName(username);

        if (!getUserByUserName) return false;

        const { name, lastName } = req.body;

        const createUser = await userManager.crearUsuario({
          name,
          lastName,
          username,
          password,
          role,
          email,
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
      async (req, username, password, done) => {
        const validateUser = await userManager.validateUser(username, password);
        console.log(validateUser);
        if (!validateUser) return "Usuario o contraseña no valido!";

        return done(null, validateUser);
      }
    )
  );

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
        const username = profile._json.login;
    

        const user = await userManager.getUsersByUsername(username);

        if (user) return done(null, user);

        const newUser = await userManager.createNewUser({
          name: profile._json.name,
          lastName: profile._json.name,
          username,
          email:profile._json.email,
          password: profile._json.password,
          role,
        });

        done (null,newUser);
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user.username);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userManager.getUsersByUsername(id);
      done(null, user);
    } catch (e) {
      done(null, false);
    }
  });
};
export default localStrategy;