import UserManager from "../mongo/usersManager.js";


const User =  new UserManager()

export const postLogin = async (req, res) => {
  try {
    let getUser = await User.getUsers();

    res.render("products", {UserNew: getUser})
    const result = await User.validateUser(req.body.email, req.body.password);
    res.send(result)
    if (!result) return res.send({ error: true });
  } catch (error) {
    console.log(error.message)
  }

}








