import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { addNewItem ,getAllItems} from "./persistance/tasks.js";

const app=express();
const port= 3000;

//Middelwear
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());



app.get("/", async (req,res) =>{
    const tasks=await getAllItems();
    const result={}
    tasks.forEach(task=> {
        const id=task.id;
        const text=task.title;
        const date=task.creation_date;
        const completed=task.completed;
        const title=task.lists_name;
        const list_id=task.lists_id;

        result[list_id]={
            id,
            title,
            list:[...(result[list_id]?.list || []), {id,text,completed}]
        }     
    });
    res.send(Object.values(result));
});


//Add task
app.post("/newtask" , async (req,res) =>{
    console.log("Logging requested body");
    console.log(req.body); 
    const newItem=req.body;
    let items=await addNewItem(newItem);
    res.send("Hello from the backend"); 
});


app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});