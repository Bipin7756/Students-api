const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/students-api", {  
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => {
     console.log("connection successfull..");
})
.catch((e) =>{ 
    console.log(e);
})