import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { email, phoneNumber, password, country, instructor = false } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = this.usersRepository.create({
            email,
            phoneNumber,
            password: hashedPassword,
            country,
            instructor,
        });

        return this.usersRepository.save(newUser);
    }

    async findAll(): Promise<User[]> {
        const users = await this.usersRepository.find();
        return users;
    }
    async findByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { email } })
    }
    async findOne(id: string): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User with ID '${id}' not found`);
        }
        return user;
    }
}
