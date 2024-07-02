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


@InputType()
export class UpdateCourseInput {
    @Field({
        nullable: true
    })
    name?: string;

    @Field({ nullable: true })
    author?: string;

    @Field({ nullable: true })
    lessons_count: number;

}