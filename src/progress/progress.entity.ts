import { Field, ObjectType } from '@nestjs/graphql';
import { Course } from '../courses/courses.entity';
import { User } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
@ObjectType()
export class Progress {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @ManyToOne(() => User, user => user.progress)
    @Field(() => User)
    user: User;

    @ManyToOne(() => Course, course => course.progress)
    @Field(() => Course)
    course: Course;

    @Field()
    @Column({ default: 0 })
    percentage_complete: number;

    @Field()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    last_updated: Date;
}
