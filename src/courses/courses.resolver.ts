// import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
// import { CoursesService } from './courses.service';
// import { Course } from './courses.entity';

// @Resolver(() => Course)
// export class CoursesResolver {
//     constructor(private readonly coursesService: CoursesService) { }

//     @Query(() => [Course])
//     async courses(): Promise<Course[]> {
//         return this.coursesService.findAll();
//     }

//     @Mutation(() => Course)
//     async createCourse(
//         @Args('user_id') user_id: string,
//         @Args('name') name: string,
//         @Args('lessons_count') lessons_count: number,
//     ): Promise<Course> {
//         return this.coursesService.create({ user_id, name, lessons_count });
//     }
// }
