import { useState } from "react";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${user.name}\nEmail: ${user.email}\nPassword: ${user.password}`);
    // Next: Send to backend API
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Create Your Account</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={user.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={user.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={user.password}
          onChange={handleChange}
        />
        <button className="btn" type="submit">Register</button>
      </form>
    </div>
  );
}
