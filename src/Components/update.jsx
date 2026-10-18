import React from 'react'

function update() {
    
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        alert("Data submit nahi hua");
        return;
      }

      alert("Data submitted successfully!");

      setName("");
      setEmail("");

      navigate("/dashboard");
    } catch (error) {
      console.log("Error:", error);
      alert("Backend server check karo");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border"
        required
      />

      <br />
      <br />

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border"
        required
      />

      <br />
      <br />

      <button type="submit" className="border">
        Submit
      </button>
    </form>
  );
}

export default App;

  return (
    {editId && (
        <form onSubmit={handleUpdate}>
          <h2>Update User</h2>

          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border"
            required
          />

          <br />
          <br />

          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border"
            required
          />

          <br />
          <br />

          <button type="submit" className="border">
            Update
          </button>

          <button
            type="button"
            className="border"
            onClick={() => {
              setEditId(null);
              setName("");
              setEmail("");
            }}
          >
            Cancel
          </button>
        </form>
      )}

  )
}

export default update