// import { connectToDatabase } from "../../lib/db"; // Подключение к базе данных
// import argon2 from "argon2"; // Для хеширования паролей

// export default async function handler(req, res) {
//    const { method } = req;
   
//    if (method === "POST") {
//       const { username, password } = req.body;

//       try {
//          const user = await connectToDatabase().then(({ database }) =>
//          database.collection("users").findOne({ username })
//          );

//          if (user && (await argon2.verify(user.password, password))) {
//          // Если логин успешен, возвращаем успешный ответ
//          res.status(200).json({ message: "Login successful", username: user.username });
//          } else {
//          // Если неверные данные, возвращаем ошибку
//          res.status(401).json({ error: "Invalid credentials" });
//          }
//       } catch (error) {
//          console.error("Login error:", error);
//          res.status(500).json({ error: "Internal Server Error" });
//       }
//    } else {
//       res.status(405).json({ error: "Method Not Allowed" });
//    }
// }


// import { connectToDatabase } from "../../lib/db"; // Для подключения к базе данных
// import argon2 from "argon2"; // Для хеширования паролей
// import jwt from 'jsonwebtoken'; // Для создания JWT

// const JWT_SECRET = process.env.JWT_SECRET;
// console.log("JWT_SECRET:", JWT_SECRET); 

// export default async function handler(req, res) {
//    const { method } = req;

//    if (method === "POST") {
//       const { username, password } = req.body;

//       try {
//          const user = await connectToDatabase().then(({ database }) =>
//             database.collection("users").findOne({ username })
//          );

//          if (user && await argon2.verify(user.password, password)) {
//             // Генерация токена
//             const token = jwt.sign(
//                { username: user.username },
//                JWT_SECRET,
//                { expiresIn: '1h' } // Токен будет действовать 1 час
//             );

//             // Отправляем токен клиенту
//             res.status(200).json({ message: "Login successful", token });
//          } else {
//             res.status(401).json({ error: "Invalid credentials" });
//          }
//       } catch (error) {
//          console.error("Login error:", error);
//          res.status(500).json({ error: "Internal Server Error" });
//       }
//    } else {
//       res.status(405).json({ error: "Method Not Allowed" });
//    }
// }



import { connectToDatabase } from "../../lib/db"; // Для подключения к базе данных
import argon2 from "argon2"; // Для хеширования паролей
import jwt from 'jsonwebtoken'; // Для создания JWT

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
   const { method } = req;

   if (method === "POST") {
      const { username, password } = req.body;

      if (!username || !password) {
         return res.status(400).json({ error: "Username and password are required" });
      }

      try {
         const user = await connectToDatabase().then(({ database }) =>
            database.collection("users").findOne({ username })
         );

         if (user && await argon2.verify(user.password, password)) {
            // Генерация токена
            const token = jwt.sign(
               { username: user.username },
               JWT_SECRET,
               { expiresIn: '1h' } // Токен будет действовать 1 час
            );

            // Отправляем токен клиенту
            res.status(200).json({ message: "Login successful", token });
         } else {
            res.status(401).json({ error: "Invalid credentials" });
         }
      } catch (error) {
         console.error("Login error:", error);
         res.status(500).json({ error: "Internal Server Error" });
      }
   } else {
      res.status(405).json({ error: "Method Not Allowed" });
   }
}





