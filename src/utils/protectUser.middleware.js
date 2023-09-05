export default (role) => (req, res, next) => {
    if (req.user && req.user.role !== role)
      return res.status(403).send({ error: true, msg: "no posees los permisos" });
    next();
  };