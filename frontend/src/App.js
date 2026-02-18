import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
    age: ""
  });
  

  const API_URL = "http://127.0.0.1:5000/students";

  // Fetch students
  const fetchStudents = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        age: parseInt(form.age)
      }),
    });
    setForm({ name: "", email: "", course: "", age: "" });
    fetchStudents();
  };

  // Delete student
  const deleteStudent = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    fetchStudents();
  };

  return (
    <div className="container">

    <div style={{ padding: "20px" }}>
      <h2>Student Registration</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="course" placeholder="Course" value={form.course} onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>

      <h3>Registered Students</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.course}</td>
              <td>{s.age}</td>
              <td>
              <button className="delete-btn" onClick={() => deleteStudent(s.id)}>
                Delete
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    

    </div>
  );
}

export default App;
