import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './courses.entity';
import { Progress } from 'src/progress/progress.entity';
import { UsersModule } from 'src/users/users.module';
import { CourseService } from './courses.service';
import { CoursesResolver } from './courses.resolver';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Progress]),
    UsersModule,
  ],
  providers: [CourseService, CoursesResolver, GqlAuthGuard],
  exports: [CourseService]
})
export class CoursesModule { }
