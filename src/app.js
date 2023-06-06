const express = require("express");
require("./db/conn");
const studentRouter = require("./routers/student");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(studentRouter);

app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
})
