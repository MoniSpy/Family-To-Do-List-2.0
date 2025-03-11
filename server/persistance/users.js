import {getDb} from "./db.js";
 //Get Users
 async function getUsers() {
    const db=getDb();
    const usersList=await db.query("SELECT * FROM users;");
    return usersList.rows;
   }

export {getUsers};