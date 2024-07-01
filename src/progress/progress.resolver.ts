// import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
// import { ProgressService } from './progress.service';
// import { Progress } from './progress.entity';

// @Resolver(() => Progress)
// export class ProgressResolver {
//     constructor(private readonly progressService: ProgressService) { }

//     @Query(() => [Progress])
//     async progress(): Promise<Progress[]> {
//         return this.progressService.findAll();
//     }

//     @Mutation(() => Progress)
//     async updateProgress(
//         @Args('user_id') user_id: string,
//         @Args('course_id') course_id: string,
//         @Args('percentage_complete') percentage_complete: number,
//     ): Promise<Progress> {
//         return this.progressService.update({ user_id, course_id, percentage_complete });
//     }
// }
