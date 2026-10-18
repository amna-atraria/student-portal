import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/users";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadStudents() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error();
        const data = await response.json();
        setStudents(Array.isArray(data) ? data : []);
      } catch {
        setError(
          "Could not load students. Check that your backend is running."
        );
      } finally {
        setLoading(false);
      }
    }
    loadStudents();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this student record?")) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error();
      setStudents((current) => current.filter((student) => student._id !== id));
    } catch {
      alert("Delete failed. Please try again.");
    }
  }

  const filteredStudents = useMemo(() => {
    const term = search.trim().toLowerCase();
    return students.filter((student) =>
      `${student.name || ""} ${student.email || ""}`
        .toLowerCase()
        .includes(term)
    );
  }, [students, search]);

  const initials = (name = "") =>
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "ST";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700">
      <div className="flex min-h-screen">
       

        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-7">
          
              <h2 className="mb-1 text-3xl font-bold text-slate-700 text-center">
                Students Directory
              </h2>
              

            <section
              id="students"
              className="overflow-hidden rounded-xl border border-slate-200 bg-white"
            >
              <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Students
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    View and manage student details
                  </p>
                </div>
                <label className="relative block w-full sm:max-w-xs">
                  <span className="absolute left-3 top-2.5 text-slate-400">
                    ⌕
                  </span>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="search"
                    aria-label="Search students"
                    placeholder="Search name or email..."
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-8 pr-3 text-sm outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                  />
                </label>
              </div>

              {error && (
                <p
                  role="alert"
                  className="m-4 rounded-lg bg-rose-50 px-3 py-2.5 text-sm text-rose-700"
                >
                  {error}
                </p>
              )}

              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-left">
                  <thead>
                    <tr className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
                      <th className="px-5 py-3 font-medium">Student</th>
                      <th className="px-5 py-3 font-medium">Email address</th>
                      <th className="px-5 py-3 text-right font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loading ? (
                      <tr>
                        <td
                          colSpan="3"
                          className="px-5 py-10 text-center text-sm text-slate-500"
                        >
                          Loading students...
                        </td>
                      </tr>
                    ) : filteredStudents.length ? (
                      filteredStudents.map((student) => (
                        <tr key={student._id} className="hover:bg-slate-50">
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-50 text-xs font-semibold text-cyan-800">
                                {initials(student.name)}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-800">
                                  {student.name || "Unnamed student"}
                                </p>
                                <p className="mt-0.5 text-xs text-slate-400">
                                  Student
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 text-sm text-slate-600">
                            {student.email}
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  navigate(`/update/${student._id}`)
                                }
                                className="rounded-md border border-cyan-200 px-3 py-1.5 text-xs font-medium text-cyan-800 hover:bg-cyan-700 hover:text-white"
                              >
                                Update
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(student._id)}
                                className="rounded-md border border-rose-200 px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-600 hover:text-white"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="px-5 py-10 text-center">
                          <p className="text-sm font-medium text-slate-700">
                            {search
                              ? "No matching students"
                              : "No students yet"}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {search
                              ? "Try another name or email."
                              : "Add a student through the signup form."}
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between border-t border-slate-100 bg-slate-50/70 px-4 py-3 text-xs text-slate-500 sm:px-5">
                <span>
                  {filteredStudents.length} of {students.length} students
                </span>
                <span>ScholarDesk</span>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
