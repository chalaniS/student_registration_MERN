const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
let students = [];

// Email validation function
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// ==============================
// Register Student
// ==============================
app.post("/students", (req, res) => {
  const { name, email, course, age } = req.body;

  // Validation
  if (!name || !email || !course || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (age <= 0) {
    return res.status(400).json({ message: "Age must be positive" });
  }

  const newStudent = {
    id: uuidv4(),
    name,
    email,
    course,
    age,
  };

  students.push(newStudent);

  res.status(201).json(newStudent);
});

// ==============================
// Get All Students
// ==============================
app.get("/students", (req, res) => {
  res.status(200).json(students);
});

// ==============================
// Delete Student
// ==============================
app.delete("/students/:id", (req, res) => {
  const { id } = req.params;

  const studentIndex = students.findIndex((s) => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students.splice(studentIndex, 1);

  res.status(204).send();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
