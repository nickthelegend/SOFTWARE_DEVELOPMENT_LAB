const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Secret key for JWT
const SECRET_KEY = "your_secret_key";

// File path for student data
const dataPath = path.join(__dirname, "data", "students.json");

// Utility function to read the student data
const readData = () => JSON.parse(fs.readFileSync(dataPath));

// Utility function to write data back to the file
const writeData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

/* ---------------------------
   Dummy User Data for Login
--------------------------- */
const USER = {
    username: "admin",
    password: bcrypt.hashSync("password123", 10), // Hash the password
};

/* ---------------------------
   Middleware for Authorization
--------------------------- */
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Access Denied. No token provided." });
    }

    try {
        const verified = jwt.verify(token.split(" ")[1], SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        return res.status(400).json({ error: "Invalid Token" });
    }
};

/* ---------------------------
   Authentication Endpoint
--------------------------- */

// Login - Generate JWT
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Check username and password
    if (username !== USER.username || !bcrypt.compareSync(password, USER.password)) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ username: USER.username }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
});

/* ---------------------------
   Protected CRUD Endpoints
--------------------------- */

// CREATE - Add a new student
app.post("/create", verifyToken, (req, res) => {
    const { name, age, course } = req.body;

    if (!name || !age || !course) {
        return res.status(400).json({ error: "All fields are required: name, age, course" });
    }

    const students = readData();
    const newStudent = { id: students.length + 1, name, age, course };

    students.push(newStudent);
    writeData(students);

    res.status(201).json({ message: "Student added successfully", student: newStudent });
});

// READ - Get all students
app.get("/read", verifyToken, (req, res) => {
    const students = readData();
    res.status(200).json(students);
});

// UPDATE - Update a student's details
app.put("/update/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    const { name, age, course } = req.body;

    let students = readData();
    const studentIndex = students.findIndex((student) => student.id === parseInt(id));

    if (studentIndex === -1) {
        return res.status(404).json({ error: "Student not found" });
    }

    // Update fields if provided
    if (name) students[studentIndex].name = name;
    if (age) students[studentIndex].age = age;
    if (course) students[studentIndex].course = course;

    writeData(students);

    res.status(200).json({ message: "Student updated successfully", student: students[studentIndex] });
});

// DELETE - Remove a student
app.delete("/delete/:id", verifyToken, (req, res) => {
    const { id } = req.params;

    let students = readData();
    const filteredStudents = students.filter((student) => student.id !== parseInt(id));

    if (filteredStudents.length === students.length) {
        return res.status(404).json({ error: "Student not found" });
    }

    writeData(filteredStudents);

    res.status(200).json({ message: "Student deleted successfully" });
});

/* ---------------------------
   Start the Server
--------------------------- */
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
