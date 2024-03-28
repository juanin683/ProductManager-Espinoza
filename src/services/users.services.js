import * as UserDao from "../dao/Dao/usersManager.dao.js"

export const  postLogin = async (req, res) => {
    try {
      const result = await UserDao.postLogin()
      res.send(result)
    } catch (error) {
      console.log(error.message)
    }
  
  }

export const createUser = async (req,res) => {
  try {
    const result = await UserDao.postCreateUser(req.body.email, req.body.password,req.body.username,req.body.name,req.body.age,req.body.lastname);
    res.send(result);
  } catch (error) {
    
  }
}
  export const getProfile = async (req, res) => {
    if (req.user.role == "admin") {
      res.send({ error: false, user: req.user });
    } else {
      res.send({ error: true, msg: "Rol Invalido" });
    }
  }

  export const getCurrentRole = async (req, res) => {
    if (req.user.role == "admin") {
      res.send({ error: false, user: req.user });
    } else {
      res.send({ error: true, msg: "Rol Invalido" });
    }
}