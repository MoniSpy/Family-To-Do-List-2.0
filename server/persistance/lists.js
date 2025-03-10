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

async function getUsersLists(id){
    const result=await db.query("SELECT lists.id ,lists_name, color FROM lists JOIN users ON users.id=lists.user_id WHERE users.id=$1;",
    [id]);
    return result.rows;
  }

  export {getUsersLists};