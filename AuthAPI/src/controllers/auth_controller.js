const { validate } = require('class-validator');
const LoginDTO = require('../dto/loginDTO');
const SignupDTO = require('../dto/signupDTO');
const AuthService = require('../services/authService');

exports.signup = async (req, res) => {
  try {
    const dto = Object.assign(new SignupDTO(), req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const user = await AuthService.signup(dto);
    res.status(201).json({ message: 'User signed up successfully', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const dto = Object.assign(new LoginDTO(), req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const token = await AuthService.login(dto);
    res.status(200).json(token);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.profile = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch profile' });
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};
