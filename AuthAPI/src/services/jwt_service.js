const jwt = require('jsonwebtoken');

class JwtService {
  static sign(payload, expiresIn = '1h') {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  }

  static verify(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  static decode(token) {
    return jwt.decode(token);
  }
}

module.exports = JwtService;
