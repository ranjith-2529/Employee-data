const express = require("express");
const fs = require("fs")
const app = express();
const dbo = require("./db"); // our database connection
const port = 8080;
// const ObjectId = dbo.ObjectId;
let text = "Ranjith";
const bodyParser = require('body-parser');
const exhbs = require("express-handlebars");
const { ObjectId } = require("mongodb");
console.log(ObjectId)
let edit_Id;
app.engine('hbs' , exhbs.engine({
    layoutsDir: __dirname+"/"+ 'views',
    defaultLayout: 'main',
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set("views" , "views");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/form",(req,res)=>{
    fs.readFile('./views/form.html', "utf-8",(err, data) => {
        if (err) throw err;
        res.end(data)
      });

})
app.get("/insert" , async(req,res)=>{
    let database = await dbo.getDatabase();
    let collection = await database.collection("employee");
    let data = {
        "Name": req.query.name,
        "Age": req.query.age,
        "Experience": req.query.experience,
        "Skills": req.query.skills,
        "Salary": req.query.salary,
        "Bal": req.query.bal
    }
    console.log(data)
    await collection.insertOne(data);
    return res.redirect('/data');
})
app.get("/",function(req,res){
        res.end(req.url);

})
app.get("/Update/" , async function(req,res){
       console.log(req.query.editId)
       edit_Id = req.query.editId
       if(req.query.editId){
        let database = await dbo.getDatabase();
        let collection = await database.collection("employee");
        // console.log({_id:`${ObjectId}('${edit_Id}')`})
        // data = await collection.findOne({_id:`${ObjectId}('${edit_Id}')`});
        data = await collection.findOne({ _id: new ObjectId(edit_Id) });
        res.render("main" , {edit_Id  , data});
       }
      
})
app.post("/update/" , async function(req,res){
    let database = await dbo.getDatabase();
    let collection = await database.collection("employee");
    console.log(req.body);
    let book1 =  {
      Name:req.body.name,
      Age:req.body.age,
      Experience:req.body.experience,
      Skills:req.body.skills,
      Salary:req.body.salary,
      Bal:req.body.bal
    }
    await collection.updateOne({ _id: new ObjectId(edit_Id)} , {$set:book1})
    return res.redirect('/data');
})
app.get("/data",async function(req,res){ 
    let database = await dbo.getDatabase();
    let collection = await database.collection("employee").find().toArray();
    res.render("main" , {text , collection});

})
app.listen(port , ()=>{
    console.log(`Server is running on port  http://localhost:${port}`)
});