const express = require("express");
require("./db/conn");
const Student = require("./models/students");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//create a new students in synchronous way

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

app.post("/students", async (req, res) => {
  try {
    const existingStudent = await Student.findOne({ name: req.body.name });

    if (existingStudent) {
      return res.status(409).send("Student already exists.");
    }

    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (e) {
    res.status(400).send(e);
  }
})

//get the student details

app.get("/students", async(req,res) => {

    try{
        const studentsData = await Student.find().lean();
        res.status(201).send(studentsData);
    }catch(e) {
        res.status(400).send(e);
    }
})

//get the students details with name

app.get("/students/:name", async (req, res) => {
    try {
      const name = req.params.name;
      const studentsData = await Student.find({ name: name });
     
      if (studentsData.length === 0) {
        return res.status(404).send("Student not found.");
      } else {
        res.send(studentsData);
      }
    } catch (e) {
      res.status(500).send(e);
    }
})  

//update the students details

app.patch("/students/:name", async (req, res) => {
    try {
      const name = req.params.name;
      const newPhoneNumber = req.body.phone;
  
      const existingStudent = await Student.findOne({ name });
      if (!existingStudent) {
        return res.status(404).send("Student not found.");
      }
  
      if (existingStudent.phone === newPhoneNumber) {
        return res.status(400).send("This number is already registered. Please try a different phone number.");
      }
  
      existingStudent.phone = newPhoneNumber;
      const updateStudents = await existingStudent.save();
  
      res.send(updatStudents);
    } catch (e) {
      res.status(400).send(e);
    }
})

// Delete a student
app.delete("/students/:name", async (req, res) => {
    try {
      const name = req.params.name;
  
      const deleteStudents = await Student.findOneAndDelete({ name });
  
      if (!deleteStudents) {
        return res.status(404).send("Student not found.");
      }
      console.log()
      res.send("Student data is successfully deleted");
    } catch (e) {
      res.status(400).send(e);
    }
})
  
app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
})
