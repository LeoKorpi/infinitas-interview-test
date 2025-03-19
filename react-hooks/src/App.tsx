import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Section from "./components/Section";
import { SchoolActionKind, useSchool, useSchoolDispatch } from "./school-context";
import infinitasLogo from "/infinitas-logo.svg";

function App() {
  const school = useSchool();
  const schoolDispatch = useSchoolDispatch();

  const [studentEditingId, setStudentEditingId] = useState<string | null>(null);
  const [updatedStudentName, setUpdatedStudentName] = useState<string>("");

  const [teacherEditingId, setTeacherEditingId] = useState<string | null>(null);
  const [newAssignedStudentId, setNewAssignedStudentId] = useState<string | null>(null);

  const handleTeacherSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formdata = new FormData(event.currentTarget);
    const teacherName = formdata.get("teacher") as string | null;

    if (!teacherName || !teacherName.trim()) {
      console.error("Cannot add teacher with no name");
      return;
    }

    const id = crypto.randomUUID();
    schoolDispatch?.({
      type: SchoolActionKind.ADD_TEACHER,
      payload: { name: teacherName, id, students: [] },
    });

    event.currentTarget.reset();
  };

  const handleStudentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formdata = new FormData(event.currentTarget);
    const studentName = formdata.get("student") as string | null;

    if (!studentName || !studentName.trim()) {
      console.error("Cannot add student with no name");
      return;
    }

    const id = crypto.randomUUID();
    schoolDispatch?.({
      type: SchoolActionKind.ADD_STUDENT,
      payload: { name: studentName, id },
    });

    event.currentTarget.reset();
  };

  const handleUpdateStudent = () => {
    if (studentEditingId) {
      schoolDispatch?.({
        type: SchoolActionKind.UPDATE_STUDENT,
        payload: { name: updatedStudentName, id: studentEditingId },
      });
    }

    setStudentEditingId(null);
    setUpdatedStudentName("");
  };

  const handleAssignStudent = () => {
    if (teacherEditingId && newAssignedStudentId) {
      schoolDispatch?.({
        type: SchoolActionKind.ASSIGN_STUDENT_TO_TEACHER,
        payload: {
          teacherId: teacherEditingId,
          studentId: newAssignedStudentId,
        },
      });
    }

    setTeacherEditingId(null);
    setNewAssignedStudentId(null);
  };

  return (
    <>
      <Header infinitasLogo={infinitasLogo} />
      <main>
        <h1>IL Interview</h1>
        <Section
          sectionName="Teacher"
          entities={school?.teachers || []}
          editingId={teacherEditingId}
          setEditingId={setTeacherEditingId}
          handleSubmit={handleTeacherSubmit}
          renderActions={(teacher) => (
            <>
              <ul>
                {teacher.students.map((studentId) => {
                  const student = school?.students.find((s) => s.id === studentId);
                  return student ? <li key={student.id}>{student.name}</li> : null;
                })}
              </ul>
              {teacher.id === teacherEditingId ? (
                <>
                  <select
                    value={newAssignedStudentId || ""}
                    onChange={(e) => setNewAssignedStudentId(e.target.value)}
                  >
                    <option value={""}>Select Student</option>
                    {school?.students.map((student) => (
                      <option
                        key={student.id}
                        value={student.id}
                      >
                        {student.name}
                      </option>
                    ))}
                  </select>
                  <button onClick={handleAssignStudent}>Assign</button>
                </>
              ) : (
                <button onClick={() => setTeacherEditingId(teacher.id)}>Assign student</button>
              )}
            </>
          )}
        />

        <Section
          sectionName="Student"
          entities={school?.students || []}
          editingId={studentEditingId}
          setEditingId={setStudentEditingId}
          handleSubmit={handleStudentSubmit}
          renderActions={(student) =>
            student.id === studentEditingId ? (
              <>
                <input
                  type="text"
                  value={updatedStudentName}
                  onChange={(e) => setUpdatedStudentName(e.target.value)}
                />
                <button onClick={handleUpdateStudent}>Done</button>
              </>
            ) : (
              <button onClick={() => setStudentEditingId(student.id)}>Update</button>
            )
          }
        />
      </main>
    </>
  );
}

export default App;
