import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Progress } from '../progress/progress.entity';
import { Course } from "../courses/courses.entity";

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @Field()
    @Column({ unique: true })
    email: string;

    @Field()
    @Column()
    phoneNumber: string;

    @Field()
    @Column()
    password: string;

    @Field()
    @Column()
    country: string;

    @Field()
    @Column({ default: false })
    instructor: boolean;

    @Field()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Field()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @OneToMany(() => Course, course => course.user)
    @Field(() => [Course])
    courses: Course[];

    @OneToMany(() => Progress, progress => progress.user)
    @Field(() => [Progress])
    progress: Progress[];
}
