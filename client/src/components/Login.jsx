import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import login from "../assets/Login page.png";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("https://gdserver-l3io.onrender.com/auth/login", {
        email,
        password,
      });
  
      const role = response.data.role; // Assuming role is part of the response
  
      if (role) {
        // Save role and token to localStorage
        localStorage.setItem("role", role); // Save role to local storage
        localStorage.setItem("token", response.data.token); // Save token to local storage
  
        // Navigate to the dashboard, passing the role in the state
        navigate("/dashboard", { state: { role } });
      } else {
        throw new Error("Role not provided in the response");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      setError("Invalid credentials. Please try again.");
    }
  };
  
  
  

  return (
    <div className="flex flex-col lg:flex-row h-screen">

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white p-8">
        <h2 className="text-3xl font-bold mb-4">Login</h2>
        <p className="text-gray-600 mb-6">See your growth and get support!</p>
        
   

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full lg:w-3/4 p-3 border border-gray-300 rounded-md mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Minimum 8 characters"
          className="w-full lg:w-3/4 p-3 border border-gray-300 rounded-md mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        

        <button
          className="w-full lg:w-3/4 bg-blue-900 text-white py-3 rounded-md hover:bg-blue-800 mb-4"
          onClick={handleLogin}
        >
          Login
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <p className="text-gray-600">
          Not registered yet?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Create a new account
          </Link>
        </p>
      </div>

      <div className="hidden lg:flex w-1/2 bg-gray-100 justify-center items-center">
        <img
          src={login}
          alt="login page"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
