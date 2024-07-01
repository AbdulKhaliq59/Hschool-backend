import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) { }

    @Query(() => String)
    sayHello(): string {
        return 'Hello World!';
    }

    @Query(() => User)
    @UseGuards(GqlAuthGuard)
    async getUser(@Args('id') id: string): Promise<User> {
        return this.usersService.findOne(id);
    }


    @Query(() => [User])
    @UseGuards(GqlAuthGuard)
    async getAllUsers(): Promise<User[]> {
        return this.usersService.findAll()
    }
    @Mutation(() => User)
    async register(@Args('createUserData') createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }
}
