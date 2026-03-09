import { useState, useEffect } from "react";
import ErrorPopup from "./ErrorPopup";

function StudentForm({ addStudent, updateStudent, editingStudent }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: ""
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setForm(editingStudent);
    }
  }, [editingStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.age) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (editingStudent) {
      updateStudent(form);
    } else {
      addStudent(form);
    }

    setForm({ name: "", email: "", age: "" });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>

          <input
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter student name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>

          <input
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter email address"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>

          <input
            type="number"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter age"
            value={form.age}
            onChange={(e) =>
              setForm({ ...form, age: e.target.value })
            }
          />
        </div>

        {/* Submit */}
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 transition text-white py-2 rounded-lg font-medium cursor-pointer" 
        >
          {editingStudent ? "Update Student" : "Add Student"}
        </button>

      </form>

      <ErrorPopup
        message={error}
        onClose={() => setError("")}
      />
    </>
  );
}

export default StudentForm;
