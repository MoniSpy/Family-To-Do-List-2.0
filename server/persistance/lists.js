import {getDb} from "./db.js";


async function addNewList(newList){
    try{
        const db=await getDb();
        const result= await db.query("INSERT INTO lists (lists_name, user_id) VALUES ($1, $2) RETURNING *",
            [newList.title,newList.user_id]
        );
        return result.rows[0];
    }catch(e){
        console.log(e.message);  
        res.status(400).send(e.message);   
    }
}

async function deleteList(listId){
    try{
        const db=await getDb();
        const deletedItems=await db.query("DELETE FROM items WHERE lists_id=$1 RETURNING *; ",
            [listId]
        ); 
        const deletedList=await db.query("DELETE FROM lists WHERE lists.id=$1 RETURNING *; ",
              [listId]
        );
        return {deletedItems:deletedItems.rows, deletedList:deletedList.rows};
    }catch(e){
        console.log(e.message); 
        res.status(400).send(e.message);    
    }
}

async function editList(listToEdit){
    try{
        const db=await getDb();
        const edited= await db.query(
            "UPDATE lists SET lists_name = $1 WHERE lists.id = $2 RETURNING * ;",
            [listToEdit.name,listToEdit.id]  
          );
        return(edited.rows[0]);
        
    }catch(e){
        console.log(e.message); 
        res.status(400).send(e.message);    
    }
}
export {addNewList, deleteList, editList };