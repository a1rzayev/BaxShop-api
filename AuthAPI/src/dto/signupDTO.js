const { IsEmail, IsString, MinLength, MaxLength, IsEnum } = require('class-validator');
const Roles = require('../utils/roles');

class SignupDTO {
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(50, { message: 'Name must be at most 50 characters long' })
  name;

  @IsEmail({}, { message: 'Invalid email format' })
  email;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 8 characters long' })
  password;

  @IsEnum(Roles, { message: 'Invalid role' })
  role;
}

module.exports = SignupDTO;