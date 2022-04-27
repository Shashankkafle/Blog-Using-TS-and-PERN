import {BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm"
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

    @Column({
        type: 'varchar',
        nullable: false,
        unique: true
    })
    username!:string
    @ManyToMany(() => User, (user) => user.blogs)
  user!: User;

    @CreateDateColumn()
    created_at!: Date;

    @CreateDateColumn()
    updated_at!: Date

}