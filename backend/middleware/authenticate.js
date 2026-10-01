const jwt = require('jsonwebtoken');


 const authenticate = (req, res, next ) =>{
 const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Authentication required"
    });
  }
  try{
 const decoded = jwt.verify(token, process.env.JWT_SECRET);
 console.log(decoded);
     req.user = decoded;
     next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
}

module.exports = authenticate;