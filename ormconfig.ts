import "reflect-metadata"
import { DataSource } from "typeorm"
import {User} from './backend/Entities/userEntity'
import { Comment } from "./backend/Entities/commentEntiity"
import dotenv from "dotenv"
import { Blog } from "./backend/Entities/blogEntity"
import { Category } from "./backend/Entities/categoryEnity"
dotenv.config()



const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432, //could not use .env
    username: "postgres",
    password: process.env.DB_PASSWORD, //could not use .env
    database: "Blog",
    entities: [User,Blog,Comment,Category],
    synchronize: true,
    logging: false,
})
export default AppDataSource

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))
