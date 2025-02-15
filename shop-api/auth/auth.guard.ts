import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedException('No token provided');

    try {
      const response = await axios.get(`${process.env.AUTH_API_URL}/auth/validate`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      request.user = response.data;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}