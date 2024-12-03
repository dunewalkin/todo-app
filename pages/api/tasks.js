// import { ObjectId } from "mongodb";
// import { connectToDatabase } from "../../lib/db";

// export default async function handler(req, res) {
//   if (req.method !== "GET") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   try {
//     const { database } = await connectToDatabase();
//     const usersCollection = database.collection("users");

//     // Получение userId из cookies (или другого метода)
//     const userId = req.cookies.userId; // Или замените на ваш способ получения userId
//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     // Получение задач пользователя
//     const user = await usersCollection.findOne(
//       { _id: new ObjectId(userId) },
//       { projection: { tasks: 1 } } // Извлекаем только поле tasks
//     );

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json(user.tasks);
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }






// import { connectToDatabase } from "../../lib/db";
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET; 
// console.log("JWT_SECRET:", JWT_SECRET); 

// export default async function handler(req, res) {
//    const { method } = req;
//    const token = req.headers.authorization?.split(" ")[1]; 

//    if (!token) {
//       return res.status(401).json({ error: "Unauthorized" });
//    }

//    try {
//       // Проверка валидности токена
//       const decoded = jwt.verify(token, JWT_SECRET);

//       const { database } = await connectToDatabase();
//       const tasksCollection = database.collection("tasks");

//       switch (method) {
//          case "GET":
//             // Получаем задачи для авторизованного пользователя
//             const tasks = await tasksCollection.find({ username: decoded.username }).toArray();
//             if (tasks.length === 0) {
//                return res.status(404).json({ message: "No tasks found for this user" });
//             }
//             res.status(200).json(tasks);
//             break;
         
//          case "POST":
//             // Добавление новой задачи
//             const { task } = req.body;
//             if (!task) {
//                return res.status(400).json({ error: "Task is required" });
//             }
//             await tasksCollection.insertOne({ username: decoded.username, name: task, completed: false });
//             res.status(201).json({ message: "Task added successfully" });
//             break;

//          // case "DELETE":
//          //    // Удаление задачи
//          //    const { taskName } = req.body;
//          //    if (!taskName) {
//          //       return res.status(400).json({ error: "Task name is required" });
//          //    }
//          //    await tasksCollection.deleteOne({ username: decoded.username, name: taskName });
//          //    res.status(200).json({ message: "Task deleted successfully" });
//          //    break;

//          // case "PATCH":
//          //    // Обновление задачи
//          //    const { taskName, completed } = req.body;
//          //    if (!taskName || completed === undefined) {
//          //       return res.status(400).json({ error: "Task name and completion status are required" });
//          //    }
//          //    await tasksCollection.updateOne(
//          //       { username: decoded.username, name: taskName },
//          //       { $set: { completed } }
//          //    );
//          //    res.status(200).json({ message: "Task updated successfully" });
//          //    break;

//          default:
//             res.status(405).json({ error: "Method Not Allowed" });
//       }
//    } catch (error) {
//       console.error("Authorization error:", error);
//       res.status(401).json({ error: "Unauthorized" });
//    }
// }





// // pages/api/tasks.js
// import { connectToDatabase } from "../../lib/db";
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET;

// export default async function handler(req, res) {
//    const { method } = req;
   
//    // Получаем токен из заголовков
//    const token = req.headers.authorization?.split(" ")[1];

//    if (!token) {
//       console.error("Authorization error: No token provided");
//       return res.status(401).json({ error: "Unauthorized: No token provided" });
//    }

//    try {
//       // Проверка валидности токена
//       const decoded = jwt.verify(token, JWT_SECRET);
//       console.log("Token decoded successfully:", decoded); // Логируем результат декодирования токена

//       const { database } = await connectToDatabase();
//       const user = database.collection(process.env.NEXT_ATLAS_COLLECTION);

//       switch (method) {
//          case "GET":
//             // Логируем запрос
//             console.log("Requesting tasks for user:", decoded.username);

//             // Получаем задачи для авторизованного пользователя
//             const tasks = await user.find;
//             console.log("Fetched tasks:", tasks); // Логируем полученные задачи

//             if (tasks.length === 0) {
//                console.error("No tasks found for this user");
//                return res.status(404).json({ message: "No tasks found for this user" });
//             }
//             res.status(200).json(tasks);
//             break;

//          default:
//             res.status(405).json({ error: "Method Not Allowed" });
//       }
//    } catch (error) {
//       // Обработка ошибок, связанных с JWT
//       console.error("Token verification error:", error);
//       res.status(401).json({ error: "Unauthorized: Invalid token" });
//    }
// }



import { connectToDatabase } from "../../lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
    const { method } = req;

    // Получаем токен из заголовков
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
        // Проверяем токен
        const decoded = jwt.verify(token, JWT_SECRET);
        const username = decoded.username;

        // Подключаемся к базе данных
        const { database } = await connectToDatabase();
        const userCollection = database.collection(process.env.NEXT_ATLAS_COLLECTION);

        switch (method) {
            case "GET":
                // Ищем пользователя и извлекаем задачи
                const user = await userCollection.findOne({ username });

                if (!user || !user.tasks || user.tasks.length === 0) {
                    return res.status(404).json({ message: "No tasks found for this user" });
                }

                // Получаем массив имен задач
                const taskNames = user.tasks.map(task => task.name);
                console.log(taskNames)
                return res.status(200).json({ tasks: taskNames });

            default:
                return res.status(405).json({ error: "Method Not Allowed" });
        }
    } catch (error) {
        console.error("Token verification or database error:", error);
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
}
