import {BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Blog } from "./blogEntity";


@Entity('user')
export class User extends BaseEntity{ //creates table it  doesnot exist

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({
        type: 'varchar',
        nullable: true,
        unique: false
    })
    firstname!:string
    @Column({
        type: 'varchar',
        nullable: true,
        unique: false
    })
    lastname!:string
    @Column({
        type: 'varchar',
        nullable: false,
        unique: true
    })
    username!:string
    @Column({
        type: 'varchar',
        nullable: false, 
        unique: false     //made falsse for testing purposes
    })
    email!:string
    @Column({
        type: 'varchar',
        nullable: false,
        unique: true
    })
    password!:string
    @Column({
        type: 'boolean',
        nullable: false,
    })
    isAdmin!:boolean
    
    @Column({
        type: 'boolean',
        nullable: false,
    })
    emailConformaton!:boolean

    @OneToMany(() => Blog, (blog) => blog.user)
  blogs!: Blog[];

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date

}