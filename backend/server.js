const express = require('express')
const studentRoutes = require('./routes/studentRoutes');
const mongoose = require('mongoose');
const app = express()


const port = 8080
app.use(express.json()) 
const URL = 'mongodb://127.0.0.1:27017/studentDB';

// Connect to mongoDB
main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(URL);
}

app.use("/student", studentRoutes);

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
