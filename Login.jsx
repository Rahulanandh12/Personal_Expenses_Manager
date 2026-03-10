import { useState } from "react";

function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Feature Added: Clear the error state as soon as the button is clicked
    setError(""); 

    try {
      const res = await fetch("http://localhost:8090/personal_expense/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (res.ok) {
        const user = await res.json();
        onLogin(user);
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Server connection failed");
    }
  };

  return (
    <div className="card" style={{ maxWidth: "400px", margin: "100px auto", padding: "30px" }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" onChange={e => setCredentials({...credentials, username: e.target.value})} required />
        <input type="password" placeholder="Password" onChange={e => setCredentials({...credentials, password: e.target.value})} required />
        <p>{error}</p>
        <button type="submit" style={{ width: "100%", marginTop: "10px" }}>Login</button>
      </form>
    </div>
  );
}

export default Login;