import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCourseInput {
    @Field()
    name: string;

    @Field()
    author: string;

    @Field(() => Int)
    lessons_count: number;

    // Remove the progress field from CreateCourseInput
}
