import { DataSource } from "typeorm";
import { defaultPath } from "./constant";
import entities from "./Entities"


const db = new DataSource({
    type:"better-sqlite3",
    database:defaultPath,
    synchronize:true,
    // logging:true,
    // dropSchema:false,
    entities,
})

export default db