import {getDb} from "./db.js";


async function addNewItem (newItem){
    
    try{
        const db=await getDb();
        const result= await db.query(`INSERT INTO items (title, creation_date, lists_id, users_id) VALUES ($1, $2, $3, $4) RETURNING *`,
            [newItem.title,newItem.date,newItem.lists_id,newItem.users_id]
        );
        console.log("logging database response");
        console.log(result.rows);
        return result.rows; 

    }catch(e){
        console.log(e);
        res.status(400).send(e.message);
    }
}
 async function getAllItems(){
    try{
        const db=await getDb();
        const result= await db.query("SELECT items.id, title, creation_date,lists_id,completed,lists_name FROM items JOIN lists ON lists.id=lists_id" );
        console.log("logging database response");
        console.log(result.rows);
        return result.rows; 

    }catch(e){
        console.log(e);
        res.status(400).send(e.message);
    }
 }
export {addNewItem, getAllItems};