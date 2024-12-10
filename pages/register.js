import { useState } from "react";
import { useRouter } from "next/router";
import "../styles/pages/login.scss";

export default function Register() {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const router = useRouter();

   const handleSubmit = async (e) => {
      e.preventDefault();

      const response = await fetch("/api/register", {
         method: "POST",
         headers: {
               "Content-Type": "application/json",
         },
         body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
         router.push(data.redirect); 
      } else {
         setError(data.error); 
      }
   };

   return (
      <div className="login-wrapper">
         <h2>Register</h2>
         <form onSubmit={handleSubmit}>
               <label htmlFor="username">Username</label>
               <input
                  type="text"
                  name="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
               />
               {error && <p>{error}</p>}
               
               <label htmlFor="password">Password</label>
               <input
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
               
               <input type="submit" value="Register" />
         </form>
      </div>
   );
}

