import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './courses.entity';
import { Progress } from '../progress/progress.entity';
import { CreateCourseInput, UpdateCourseInput } from './course-input.dto';
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
            relations: ['progress'],
        });
    }

    async getUserCourses(userId: string): Promise<Course[]> {
        return this.courseRepository.find({
            where: { user: { id: userId } },
            relations: ['progress'],
        });
    }

    async updateCourse(id: string, updateCourseInput: UpdateCourseInput, user: any, progress: number): Promise<Course> {
        const course = await this.courseRepository.findOne({
            where: { id, user: { id: user.userId } },
            relations: ['progress'],
        });

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        if (progress !== undefined) {
            let progressEntity = await this.progressRepository.findOne({
                where: { course: { id: course.id }, user: { id: user.userId } },
            });

            if (!progressEntity) {
                progressEntity = this.progressRepository.create({
                    user: { id: user.userId } as User,
                    course: course,
                    percentage_complete: progress,
                });
            } else {
                progressEntity.percentage_complete = progress;
            }
            await this.progressRepository.save(progressEntity);
        }

        Object.assign(course, updateCourseInput);
        await this.courseRepository.save(course);

        return this.courseRepository.findOne({
            where: { id: course.id },
            relations: ['progress'],
        });
    }
}
