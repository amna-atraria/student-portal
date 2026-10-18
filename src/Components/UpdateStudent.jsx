import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:5000/users";

function UpdateStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStudent() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error();
        const students = await response.json();
        const student = students.find((item) => item._id === id);
        if (!student) {
          setError("Student record was not found.");
          return;
        }
        setName(student.name || "");
        setEmail(student.email || "");
      } catch {
        setError("Unable to load student details. Make sure your backend is running.");
      } finally {
        setLoading(false);
      }
    }
    loadStudent();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      if (!response.ok) throw new Error("Update failed. Please check the details and try again.");
      alert("Student details updated successfully.")
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong while updating the student.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-lg font-black text-cyan-300">S</div>
            <div>
              <p className="font-bold text-slate-950">ScholarDesk</p>
              <p className="text-xs text-slate-500">Student portal</p>
            </div>
          </Link>
          <Link to="/dashboard" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">← Back to dashboard</Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-7">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-700">Student records</p>
          <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Update student</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">Make changes to the student details below, then save your updates.</p>
        </div>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-gradient-to-r from-slate-950 to-slate-800 px-6 py-5 text-white sm:px-8">
            <p className="text-sm font-semibold">Student information</p>
            <p className="mt-1 text-xs text-slate-300">Fields marked with * are required.</p>
          </div>

          {loading ? (
            <div className="px-6 py-14 text-center text-sm text-slate-500">Loading student details...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
              {error && <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}
              <div>
                <label htmlFor="student-name" className="mb-2 block text-sm font-semibold text-slate-700">Full name *</label>
                <input
                  id="student-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter student's full name"
                  autoComplete="name"
                  required
                  minLength={2}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-50"
                />
              </div>
              <div>
                <label htmlFor="student-email" className="mb-2 block text-sm font-semibold text-slate-700">Email address *</label>
                <input
                  id="student-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="student@example.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-50"
                />
              </div>
              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <Link to="/dashboard" className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">Cancel</Link>
                <button type="submit" disabled={saving} className="inline-flex items-center justify-center rounded-xl bg-cyan-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-60">
                  {saving ? "Saving changes..." : "Save changes"}
                </button>
              </div>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}

export default UpdateStudent;
