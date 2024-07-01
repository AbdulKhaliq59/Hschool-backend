import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/users.entity';
import { Course } from '../courses/courses.entity';

@Entity()
export class Progress {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.id)
    user_id: User;

    @ManyToOne(() => Course, course => course.id)
    course_id: Course;

    @Column({ default: 0 })
    percentage_complete: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    last_updated: Date;
}
