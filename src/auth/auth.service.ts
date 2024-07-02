import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { AuthInput } from './auth-input.dto';
import { AuthResponse } from './auth-response.dto';
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string,
        password: string
    ): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user
            return result
        }
        return null;
    }

    async login(authInput: AuthInput): Promise<AuthResponse> {
        const user = await this.validateUser(authInput.email, authInput.password)

        if (!user) {
            throw new UnauthorizedException('Invalid credentials')
        }
        const payload = { user_id: user.id, email: user.email, sub: user.id }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
