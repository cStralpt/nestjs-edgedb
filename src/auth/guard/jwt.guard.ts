import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('my-auth-strategy-name') {
  constructor() {
    super();
  }
}
