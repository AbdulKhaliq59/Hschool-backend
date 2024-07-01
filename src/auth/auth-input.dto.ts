import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class AuthInput {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    password: string;
}
