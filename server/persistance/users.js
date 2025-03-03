import pg from "pg";
import env from "dotenv";

env.config();

const db= new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});
db.connect();

 //Get Users
 async function getUsers() {
    const usersList=await db.query("SELECT * FROM users;");
    return usersList.rows;
   }

export {getUsers};