const jwt = require('jsonwebtoken');
const jwtSecretKey = 'try to hack this';

const userAuth = (req, res, next) => {
  try {
    // Extract the token from the request header
    const token = req.header('auth-token');

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, jwtSecretKey);

    // Attach the user ID from the token to the request object
    req.userId = decoded.id;

    // Call the next middleware
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = userAuth;
