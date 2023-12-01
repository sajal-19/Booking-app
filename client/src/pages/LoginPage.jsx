import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

 
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
  
    try {
      const response = await axios.post('/login', { email, password });
     // console.log('Server response:', response);
  
      const { data } = response;
      //console.log('Response data:', data);
  
      if (data._id) {
        setUser(data);
        alert('Login successful');
        setRedirect(true);
      } else {
       // console.log('Login failed. Server response:', response);
        alert('Login failed');
      }
      
    } catch (e) {
     // console.error('Login failed. Error:', e); // Log the error
      alert('Login failed');
    }
  }

    if (redirect) {
      // Redirect to home after the user state is set
      return <Navigate to={'/'} />;
    }
  


  return (
    <div className="logi mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4"> Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            required
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{' '}
            <Link className="underline text-black" to={'/register'}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
