import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn,UpdateDateColumn,JoinTable, OneToMany, ManyToMany} from "typeorm"
import { Category } from "./categoryEnity";
import { User } from "./userEntity";


@Entity('blog')
export class Blog extends BaseEntity{ //creates table it  doesnot exist

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

    @ManyToOne(() => User, (user) => user.blogs)
    user!: User;

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[]

//     @OneToMany(() => Comment, (comment) => comment.blog)
//   comments!: Comment[];

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date

}