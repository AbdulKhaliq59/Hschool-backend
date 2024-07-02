import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './courses.entity';
import { Progress } from '../progress/progress.entity';
import { CreateCourseInput } from './create-course-input.dto';
import { User } from '../users/users.entity';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private courseRepository: Repository<Course>,
        @InjectRepository(Progress)
        private progressRepository: Repository<Progress>,
    ) { }

    async createCourse(createCourseInput: CreateCourseInput, user: any, progress: number): Promise<Course> {
        console.log("User", user);

        const course = this.courseRepository.create({
            ...createCourseInput,
            user: { id: user.userId } as User,
        });

        const savedCourse = await this.courseRepository.save(course);
        const progressEntity = this.progressRepository.create({
            user: { id: user.userId } as User,
            course: savedCourse,
            percentage_complete: progress,
        });
        await this.progressRepository.save(progressEntity);

        return this.courseRepository.findOne({
            where: { id: savedCourse.id },
            relations: ['progress']
        });
    }

    async getUserCourses(userId: string): Promise<Course[]> {
        return this.courseRepository.find({
            where: {
                user: { id: userId }
            },
            relations: ['progress']
        })
    }
}
