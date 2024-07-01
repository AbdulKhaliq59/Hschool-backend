import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    password: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    country: string;

    @Field({ nullable: true, defaultValue: false })
    @IsBoolean()
    @IsOptional()
    instructor?: boolean;
}
