function StudentTable({ students, onEdit, onDelete }) {

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">

      <table className="w-full text-left border-collapse">

        {/* Table Header */}
        <thead className="bg-gray-100 text-gray-700">

          <tr>
            <th className="p-3 font-semibold">Name</th>
            <th className="p-3 font-semibold">Email</th>
            <th className="p-3 font-semibold">Age</th>
            <th className="p-3 font-semibold text-center">Actions</th>
          </tr>

        </thead>

        {/* Table Body */}
        <tbody>

          {students.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="text-center p-6 text-gray-500"
              >
                No students found
              </td>
            </tr>
          ) : (

            students.map((student, index) => (

              <tr
                key={student.id}
                className={`border-t hover:bg-gray-50 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >

                <td className="p-3">{student.name}</td>

                <td className="p-3">{student.email}</td>

                <td className="p-3">{student.age}</td>

                <td className="p-3 text-center space-x-2">

                  <button
                    onClick={() => onEdit(student)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md transition cursor-pointer"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(student.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition cursor-pointer"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default StudentTable;
