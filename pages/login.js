// import { useState } from "react";
// import { useRouter } from "next/router";

// export default function Login() {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const router = useRouter();

//     const handleSubmit = async (event) => {
//       event.preventDefault();
      
//       const username = event.target.username.value;
//       const password = event.target.password.value;
    
//       try {
//         const response = await fetch("/api/auth", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ username, password }),
//         });
    
//         if (response.ok) {
//           console.log("Login successful");
//           // Дополнительная логика после успешного логина
//         } else {
//           const errorData = await response.json();
//           console.error("Login failed:", errorData.error);
//         }
//       } catch (error) {
//         console.error("An error occurred:", error);
//       }
//     };
    

//     return (
//         <div className="login-wrapper">
//             <h2>Sign In</h2>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="username">Username</label>
//                 <input
//                     type="text"
//                     id="username"
//                     name="username"
//                     required
//                     placeholder="Enter your username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//                 {error && <p>{error}</p>}
                
//                 <label htmlFor="password">Password</label>
//                 <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     required
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
                
//                 <input type="submit" value="Login" />
//                 <button type="button" onClick={() => router.push("/register")}>Register</button>
//             </form>
//         </div>
//     );
// }





import { useState } from 'react';
import { useRouter } from 'next/router'; // Хук для работы с роутером

const LoginForm = () => {
  const router = useRouter(); // Получаем доступ к роутеру
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Отправляем запрос на сервер
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      // Если логин успешен, перенаправляем пользователя
      localStorage.setItem("token", data.token); // Пример сохранения токена
      localStorage.setItem("username", username);
      router.push('/tasks');
    } else {
      // Если ошибка, показываем сообщение
      const data = await res.json();
      setErrorMessage(data.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button type="submit">Login</button>

      <button type="button" onClick={() => router.push("/register")}>Register</button>
    </form>
  );
};

export default LoginForm;
