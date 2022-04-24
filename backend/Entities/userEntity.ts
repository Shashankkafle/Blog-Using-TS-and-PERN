import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";


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
        unique: true
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
    @CreateDateColumn()
    created_at!: Date;

    @CreateDateColumn()
    updated_at!: Date

}