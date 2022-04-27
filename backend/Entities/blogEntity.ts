import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn,UpdateDateColumn,JoinTable} from "typeorm"
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

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date

}