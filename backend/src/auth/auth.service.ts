import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
      ) {}
    
      async login(userName: string, password: string) {
        const payload = { username: userName, id: password };
        const token = this.jwtService.sign(payload, { secret: 'defaultsecret', expiresIn: '1h' })
        return {
          access: token
        };
      }

      async validateToken(token: string) {
        try {
          const data = this.jwtService.verify(token, { secret: 'defaultsecret' });
          return true;
        } catch (error) {
          return false;
        }
      }

}
