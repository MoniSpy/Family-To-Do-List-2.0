import {getDb} from "./db.js";


async function addNewList(newList){
    try{
        const db=await getDb();
        const result= await db.query("INSERT INTO lists (lists_name, user_id) VALUES ($1, $2) RETURNING *",
            [newList.title,newList.user_id]
        );
        console.log(result.rows);
        // const results=await db.query("INSERT INTO items (title,creation_date,lists_id,users_id,completed) VALUES ($1,$2,$3,$4,$5)",[])
        return result.rows[0];
    }catch(e){
        console.log(e.message);     
    }
    
}
export {addNewList};