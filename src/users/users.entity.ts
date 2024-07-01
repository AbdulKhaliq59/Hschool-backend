    import { Field, ObjectType } from "@nestjs/graphql";
    import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    }
