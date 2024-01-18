const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const Authorize = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ error: "Unauthorized request" });
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Unauthorized request" });
  }

  const verified = jwt.verify(token, secret);
  if (!verified) {
    res.status(401).json({
      error: "unauthorized request",
    });
  }

  next();
};

module.exports = Authorize;
