
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();


    if (user && user.email === email || name === name ) {
     
      navigate("/dashboard");
    } else {
      setError("Account not found. Please sign up first.");
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-5">
        <h1 className="text-3xl font-bold text-center text-blue-600">Welcome Back!</h1>
        <p className="text-center text-gray-500">Login to your student portal</p>

        <input className="w-full border p-3 rounded-lg" type="text" placeholder="Name" value={name} onChange={e => setName (e.target.value)} required />
        <input className="w-full border p-3 rounded-lg" type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">Login</button>

        <p className="text-center text-gray-600">
          New here? <Link to="/signup" className="text-blue-600 font-semibold">Create account</Link>
        </p>
      </form>
    </div>
  );
}
