// import { connectToDatabase } from "../../../lib/db"; // Подключение к базе данных

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { task } = req.body;

//     try {
//       const { database } = await connectToDatabase();
//       const tasksCollection = database.collection('tasks');

//       // Сохраняем задачу в базе данных
//       const newTask = {
//         name: task,
//         completed: false,
//         createdAt: new Date(),
//       };

//       await tasksCollection.insertOne(newTask);

//       res.status(201).json(newTask); // Возвращаем добавленную задачу
//     } catch (error) {
//       console.error("Error adding task:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   } else {
//     res.status(405).json({ error: "Method Not Allowed" });
//   }
// }


import { connectToDatabase } from "../../../lib/db"; // Подключение к базе данных

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, task } = req.body;  // Ожидаем, что приходят данные о пользователе и задаче

    if (!username || !task) {
      return res.status(400).json({ error: "Username and task are required" });
    }

    try {
      const { database } = await connectToDatabase();
      const usersCollection = database.collection("users");

      // Найдем пользователя по username
      const user = await usersCollection.findOne({ username });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Создаем новую задачу
      const newTask = {
        name: task,
        completed: false,
      //   createdAt: new Date(),
      };

      // Обновляем пользователя, добавляя новую задачу в массив tasks
      const updatedUser = await usersCollection.updateOne(
        { username },  // Ищем пользователя по имени
        {
          $push: { tasks: newTask },  // Добавляем задачу в массив tasks
        }
      );

      if (updatedUser.modifiedCount === 0) {
        return res.status(500).json({ error: "Failed to add task" });
      }

      // Возвращаем добавленную задачу в ответ
      res.status(201).json(newTask);

    } catch (error) {
      console.error("Error adding task:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}


