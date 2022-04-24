import "reflect-metadata"
import { DataSource } from "typeorm"
import {User} from './backend/Entities/userEntity'


const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "Blog",
    entities: [User],
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
