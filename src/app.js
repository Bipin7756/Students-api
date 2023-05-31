const express = require("express");
require("./db/conn");
const Student = require("./models/students");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


//create a new students
// app.post("/students",(req,res) => {
//     console.log(req.body);
//     const user = new Student(req.body);
//     user.save().then(() => {
//         res.status(201).send(user);
//     }).catch((e) =>{
//         res.status(400).send(e);
//     })
// })

// create a students details
app.post("/students",async(req,res) => {

    try{
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }catch(e) {
        res.status(400).send(e);
    }
})

//get the student details

app.get("/students", async(req,res) => {

    try{
        const studentsData = await Student.find();
        res.status(201).send(studentsData);
    }catch(e) {
        res.status(400).send(e);
    }
})

//get the students details with name

app.get("/students/:name", async(req,res) => {

    try{
        const name = req.params.name;
        const studentsData = await Student.find({ name: name });
       
        if(!studentsData){
            return res.status(404).send();
        }else{
            res.send(studentsData);
        }
    }catch(e) {
        res.status(500).send(e);
    }
})

//update the students details

app.patch("/students/:name", async(req,res) => {

    try{
        const name = req.params.name;
        const updateStudents = await Student.findOneAndUpdate( name , req.body, {
            new : true
        });
        res.send(updateStudents);
    }catch(e) {
        res.status(400).send(e);
    }
})


app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
})