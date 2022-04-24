import { DataSource } from "typeorm"
import {User} from '../Entities/userEntity'

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "blog",
    entities: [User],
    synchronize: true,
    logging: false,
})