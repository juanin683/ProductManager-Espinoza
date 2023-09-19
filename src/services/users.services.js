import * as UserDao from "../dao/Dao/usersManager.dao";

export const  postLogin = async (req, res) => {
    try {
      const result = await UserDao.postLogin()
      res.send(result)
    } catch (error) {
      console.log(error.message)
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