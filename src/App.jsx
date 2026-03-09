import { useState, useEffect } from "react";
import StudentModal from "./components/StudentModal";
import StudentTable from "./components/StudentTable";
import ConfirmDialog from "./components/ConfirmDialog";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function App() {
  // Load from localStorage
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = useState(true);

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [search, setSearch] = useState("");
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false);

  // Simulated loading
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // Filter students
  const filteredStudents = students.filter(
    (s) =>
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSave = (student) => {
    if (editingStudent) {
      setStudents(
        students.map((s) =>
          s.id === editingStudent.id ? { ...student, id: s.id } : s,
        ),
      );
      setEditingStudent(null);
    } else {
      setStudents([...students, { ...student, id: Date.now() }]);
    }

    setModalOpen(false);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    setStudents(students.filter((s) => s.id !== deleteId));
    setConfirmOpen(false);
  };

  // Confirm clear all data
  const confirmClearData = () => {
    localStorage.removeItem("students");
    setStudents([]);
    setClearConfirmOpen(false);
  };

  // Excel download
  const downloadExcel = (type) => {
    const data = type === "filtered" ? filteredStudents : students;

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, "students.xlsx");
  };

  // Loading screen
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-xl font-bold">Loading Students...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-10">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Students Dashboard
          </h1>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setEditingStudent(null);
                setModalOpen(true);
              }}
              className="bg-green-500 hover:bg-green-600 transition text-white px-4 py-2 rounded-lg shadow cursor-pointer"
            >
              Add Student
            </button>

            <button
              onClick={() => downloadExcel("filtered")}
              className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded-lg shadow cursor-pointer"
            >
              Download Filtered
            </button>

            <button
              onClick={() => downloadExcel("all")}
              className="bg-purple-500 hover:bg-purple-600 transition text-white px-4 py-2 rounded-lg shadow cursor-pointer"
            >
              Download All
            </button>

            <button
              onClick={() => setClearConfirmOpen(true)}
              className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg shadow cursor-pointer"
            >
              Clear Data
            </button>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none p-3 rounded-lg"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <StudentTable
            students={filteredStudents}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {/* Modal */}
        <StudentModal
          isOpen={isModalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditingStudent(null);
          }}
          onSave={handleSave}
          editingStudent={editingStudent}
        />

        {/* Delete Confirmation */}
        <ConfirmDialog
          isOpen={confirmOpen}
          message="Are you sure you want to delete this student?"
          onConfirm={confirmDelete}
          onCancel={() => setConfirmOpen(false)}
        />

        {/* Clear Confirmation */}
        <ConfirmDialog
          isOpen={clearConfirmOpen}
          message="This will permanently delete all students. Continue?"
          onConfirm={confirmClearData}
          onCancel={() => setClearConfirmOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;
