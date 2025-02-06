const bcrypt = require('bcrypt');
const User = require('../models/user');
const Roles = require('../utils/roles');
const JwtService = require('./jwtService');

const signup = async (data) => {
  const { email, password, name, role } = data;

  if (role && !Object.values(Roles).includes(role)) {
    throw new Error('Invalid role');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    role: role || Roles.USER
  });

  await user.save();
  return user;
};

const login = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = JwtService.sign({ userId: user._id, role: user.role });

  return { token };
};

module.exports = { signup, login };
