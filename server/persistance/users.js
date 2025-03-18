import {getDb} from "./db.js";
import { getDate } from "../helpers/helpers.js";

//not sure if i need
async function getUserItems(userId){
    const db=await getDb();
        const result=await db.query("SELECT items.id , title, creation_date, lists_id, users_id FROM items JOIN users ON users.id = users_id WHERE users_id =($1) ORDER BY items.id ASC",
            [userId]
          );
          
          let items= result.rows;
          items.forEach((item) => {
            item.creation_date=getDate(item.creation_date);  
          });
          // console.log("users items");
          // console.log(items);
         
          return items; 
      }


async function getUserLists(userId){
        const db=await getDb();
        const result=await db.query("SELECT lists.id ,lists_name, user_id FROM lists JOIN users ON users.id=lists.user_id WHERE users.id=$1;",
        [userId]);
        let lists=result.rows;
        // console.log("users lists");
        // console.log(lists);
        return result.rows;
      }


export { getUserItems, getUserLists};