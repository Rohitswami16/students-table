import { useState, useEffect } from "react";
import ErrorPopup from "./ErrorPopup";

function StudentModal({ isOpen, onClose, onSave, editingStudent }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setForm(editingStudent);
    } else {
      setForm({
        name: "",
        email: "",
        age: "",
      });
    }

    setError("");
  }, [editingStudent, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.age) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      setError("Invalid email format");
      return;
    }

    onSave(form);

    setForm({
      name: "",
      email: "",
      age: "",
    });

    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-xl w-105 p-6">
          {/* Header */}
          <div className="relative mb-5">
            <h2 className="text-xl font-bold text-gray-800 text-center">
              {editingStudent ? "Edit Student" : "Add Student"}
            </h2>

            <button
              onClick={onClose}
              className="absolute right-0 top-0 text-gray-500 hover:text-gray-700 text-lg cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>

              <input
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>

              <input
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                onChange={(e) => setForm({ ...form, age: e.target.value })}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition cursor-pointer"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      <ErrorPopup message={error} onClose={() => setError("")} />
    </>
  );
}

export default StudentModal;
