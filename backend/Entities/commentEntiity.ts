import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn,UpdateDateColumn} from "typeorm"
import { User } from "./userEntity"
import { Blog } from "./blogEntity";


@Entity('comment')
export class Comment extends BaseEntity{ //creates table it  doesnot exist

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({
        type: 'text',
        nullable: false,
        unique: false
    })
    title!:string
    @Column({
        type: 'text',
        nullable: true,
        unique: false
    })
    content!:string

    // @ManyToOne(() => User, (user) => user.comments)
    // user!: User;
    
    // @ManyToOne(() => Blog, (blog) => blog.comments)
    // blog!: Blog;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date

}