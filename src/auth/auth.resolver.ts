import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/users.entity';
import { AuthService } from './auth.service';
import { AuthInput } from './auth-input.dto';
import { AuthResponse } from './auth-response.dto';

@Resolver(() => User)
export class AuthResolver {

    constructor(private readonly authService: AuthService) { }
    @Mutation(() => AuthResponse)
    async login(
        @Args('authInput') authInput: AuthInput
    ): Promise<AuthResponse> {

        return this.authService.login(authInput)
    }

}
