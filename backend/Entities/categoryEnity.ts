import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn,UpdateDateColumn,JoinTable, OneToMany} from "typeorm"


@Entity('category')
export class Category extends BaseEntity{ //creates table it  doesnot exist


    @PrimaryColumn({
        type: 'varchar',
        nullable: false,
        unique: false
    })
    name!:string

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date

}