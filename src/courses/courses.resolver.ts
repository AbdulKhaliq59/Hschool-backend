import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import { CourseService } from './courses.service';
import { Course } from './courses.entity';
import { CreateCourseInput, UpdateCourseInput } from './course-input.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { User } from '../users/users.entity';

@Resolver(() => Course)
export class CoursesResolver {
    constructor(private coursesService: CourseService) { }

    @Mutation(() => Course)
    @UseGuards(GqlAuthGuard)
    async createCourse(
        @Args('createCourseInput') createCourseInput: CreateCourseInput,
        @Args('progress') progress: number,
        @Context() context: any,
    ): Promise<Course> {
        const user = context.user;

        if (!user || !user?.userId) {
            throw new Error('User ID is missing');
        }

        return this.coursesService.createCourse(createCourseInput, user, progress);
    }

    @Query(() => [Course])
    @UseGuards(GqlAuthGuard)
    async getUserCourses(@Context() context: any): Promise<Course[]> {
        const user = context.user;

        if (!user || !user.userId) {
            throw new Error('User ID is missing');
        }

        return this.coursesService.getUserCourses(user.userId);
    }

    @Mutation(() => Course)
    @UseGuards(GqlAuthGuard)
    async updateCourse(
        @Args('id') id: string,
        @Args('updateCourseInput') updateCourseInput: UpdateCourseInput,
        @Args('progress', { nullable: true }) progress: number,
        @Context() context: any,
    ): Promise<Course> {
        const user = context.user;

        if (!user || !user.userId) {
            throw new Error('User ID is missing');
        }

        return this.coursesService.updateCourse(id, updateCourseInput, user, progress);
    }
}
