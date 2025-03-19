import {getDb} from "./db.js";

async function addNewItem (newItem){  
    try{
        const db=await getDb();
        const result= await db.query(`INSERT INTO items (text, creation_date, lists_id, users_id, completed) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [newItem.text,newItem.date,newItem.lists_id,newItem.users_id,newItem.completed]
        );
        return result.rows; 

    }catch(e){
        console.log(e.message); 
        res.status(400).send(e.message);
    }
}

async function deleteItem(itemId){
    try{

        const db=await getDb();
        const result=await db.query("DELETE FROM items WHERE items.id=$1 RETURNING *; ",
            [itemId]);
        return result.rows; 
    }catch{
        console.log(e.message); 
        res.status(400).send(e.message);
    }

}

export {addNewItem, deleteItem};