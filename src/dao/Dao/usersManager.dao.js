import UserManager from "../mongo/usersManager.js";
import ProductManager from "../mongo/ProductManager.js";

const Pm = new ProductManager();
const User = new UserManager();

export const postLogin = async (req, res) => {
  try {
    let prodsInLogin = await Pm.getProducts();

    res.render("allproducts", { allProducts: prodsInLogin });

    const result = await User.validateUser(req.body.email, req.body.password);
    res.send(result);
    if (!result) return res.send({ error: true });
  } catch (error) {
    console.log(error.message);
  }
};
