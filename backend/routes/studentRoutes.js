const express = require('express');
const route = express.Router();
const Student = require('../models/student');
const multer = require('multer');

/*
// Set up multer to store files in/uploads folder
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/');
    },
    filename: (req, file, cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
})
*/

// Set up multer to store files in memory as Buffer
const storage = multer.memoryStorage();


const upload = multer({storage: storage});

// Route to create a new student
route.post('/create', upload.single('photo'), async (req, res) => {
    try{
        const {studentName, age, email, phone, address} = req.body;
        // const photopath = req.file ? req.file.path : null; // Path to the uploaded photo
        const photoBase64 = req.file ? req.file.buffer.toString('base64') : null; // Store base64 encoded data
        console.log("Received photo of size:", req.file ? req.file.size : 0);
        // Create a new student document
        const newStudent = new Student({
            name: studentName,
            age: age,
            email: email,
            phone: phone,
            address: address,
            photo: photoBase64
        });
        await newStudent.save();
        res.status(201).json({message: 'Student created successfully', student: newStudent});
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Server error'});
    }
});

module.exports = route;