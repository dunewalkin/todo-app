import { useState } from 'react';
import { useRouter } from 'next/router';
import "../styles/pages/login.scss";

const LoginForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/tasks');
      } else {
        const data = await res.json();
        setErrorMessage(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
   <div className='login-wrapper'>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
         <div>
            <label htmlFor="username">Username</label>
            <input
               type="text"
               id="username"
               name="username"
               placeholder="Enter your username"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               required
            />
         </div>
         <div>
            <label htmlFor="password">Password</label>
            <input
               type="password"
               id="password"
               name="password"
               placeholder="Enter your password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
            />
         </div>
         {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
         <input type="submit" value="Login"></input>
         <button type="button" onClick={() => router.push('/register')}>
            Register
         </button>
      </form>
   </div>
  );
};

export default LoginForm;
