import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'blabla',
    });
  }

  async validate(payload: any) {
    // Renvoie les informations à attacher à request.user
    return { id: payload.sub, phoneNumber: payload.phoneNumber };
  }
}