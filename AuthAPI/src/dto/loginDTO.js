const { IsEmail, IsString, MinLength } = require('class-validator');

class LoginDTO {
    @IsEmail({}, { message: 'Invalid email format' })
    email;
  
    @IsString()
    @MinLength(6, { message: 'Password must be at least 8 characters long' })
    password;
  }
  
  module.exports =  LoginDTO ;