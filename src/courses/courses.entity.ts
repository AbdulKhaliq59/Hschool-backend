import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/users.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Progress } from '../progress/progress.entity';

@Entity()
@ObjectType()
export class Course {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @ManyToOne(() => User, user => user.courses)
    @Field(() => User)
    user: User;

    @OneToMany(() => Progress, progress => progress.course)
    @Field(() => [Progress])
    progress: Progress[];

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    author: string;

    @Field()
    @Column()
    lessons_count: number;

    @Field()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Field()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
