export default (role) => (req, res) => {
    if (req.user && req.user.role !== role)
      return res.status(403).send({ error: true, msg: "no posees los permisos" });
    
  };