from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr, Field
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import uuid

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage
students = []

# Pydantic Model
class Student(BaseModel):
    id: str = None
    name: str = Field(..., min_length=1)
    email: EmailStr
    course: str = Field(..., min_length=1)
    age: int = Field(..., gt=0)

# Register Student
@app.post("/students", status_code=201)
def register_student(student: Student):
    student.id = str(uuid.uuid4())
    students.append(student)
    return student

# Get All Students
@app.get("/students", response_model=List[Student])
def get_students():
    return students

# Delete Student
@app.delete("/students/{student_id}", status_code=204)
def delete_student(student_id: str):
    for student in students:
        if student.id == student_id:
            students.remove(student)
            return
    raise HTTPException(status_code=404, detail="Student not found")
