import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    
    console.log('AuthGuard token:', token); // Добавьте это
    
    if (!token) return false;
    
    try {
      const payload = await this.jwtService.verifyAsync(token);
      console.log('Token payload:', payload); // Добавьте это
      return true;
    } catch (err) {
      console.log('Token verification error:', err); // Добавьте это
      return false;
    }
  }
}