const jwt = require('jsonwebtoken');
const jwtSecretKey = 'try to hack this';

const userAuth = (req, res, next) => {
  try {
    // Extract the authorization token from the request headers
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, jwtSecretKey);

    // Attach the user ID from the token to the request object
    req.userId = decoded.user.id;


    // Call the next middleware
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = userAuth;
