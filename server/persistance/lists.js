import {getDb} from "./db.js";

async function getUsersLists(id){
    const db=await getDb();
    const result=await db.query("SELECT lists.id ,lists_name, color FROM lists JOIN users ON users.id=lists.user_id WHERE users.id=$1;",
    [id]);
    return result.rows;
  }

  export {getUsersLists};