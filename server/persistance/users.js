import {getDb} from "./db.js";
import { getDate } from "../helpers/helpers.js";



async function addUser(newUser){
  try {
    const db=await getDb();
    const result=await db.query( "INSERT INTO users ( email, password, first_name, last_name) VALUES($1, $2 ,$3, $4) RETURNING *;",
      [newUser.email,newUser.password,newUser.firstName, newUser.lastName]   
    );
    return result.rows[0]; 

  }catch(e){
    console.log(e.message);
  }
  
}

async function getUserItems(userId){
    const db=await getDb();
        const result=await db.query("SELECT items.id , text, creation_date, lists_id, users_id FROM items JOIN users ON users.id = users_id WHERE users_id =($1) ORDER BY items.id ASC",
            [userId]
          );
          let items= result.rows;
          console.log("🚀 ~ getUserItems ~ items:", items);
          
          items.forEach((item) => {
            item.creation_date=getDate(item.creation_date);  
          });
          return items; 
      }


async function getUserLists(userId){
        const db=await getDb();
        const result=await db.query("SELECT lists.id ,lists_name, user_id FROM lists JOIN users ON users.id=lists.user_id WHERE users.id=$1;",
        [userId]);
        let lists=result.rows;
        console.log("🚀 ~ getUserLists ~ lists:", lists);
        return result.rows;
      }


export { getUserItems, getUserLists, addUser};