import {getDb} from "./db.js";

async function addNewItem (newItem){  
    console.log(newItem);
    try{
        const db=await getDb();
        const result= await db.query(`INSERT INTO items (text, creation_date, lists_id, users_id, completed) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [newItem.text,newItem.date,newItem.lists_id,newItem.users_id,newItem.completed]
        );
        // console.log("logging database response");
        // console.log(result.rows);
        return result.rows; 

    }catch(e){
        console.log(e.message); 
    }
}
 async function getAllItems(){
    try{
        const db=await getDb();
        const result= await db.query("SELECT items.id, text, creation_date,lists_id,completed,lists_name FROM items JOIN lists ON lists.id=lists_id" );
        return result.rows; 
    }catch(e){
        console.log(e);
        res.status(400).send(e.message);
    }
 }

export {addNewItem, getAllItems};