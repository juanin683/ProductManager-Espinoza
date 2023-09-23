import UserManager from "../mongo/usersManager.js";


const User =  new UserManager()

export const postLogin = async (req, res) => {
  try {
    const result = await User.validateUser(req.body.email, req.body.password);
    res.send(result)
    if (!result) return res.send({ error: true });
  } catch (error) {
    console.log(error.message)
  }

}








