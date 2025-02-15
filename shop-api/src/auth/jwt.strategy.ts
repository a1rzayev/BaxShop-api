import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import axios from 'axios';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    try {
      const response = await axios.get(`${process.env.AUTH_API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${payload.token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error('Token validation failed');
    }
  }
}