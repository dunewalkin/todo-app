import { connectToDatabase } from "../../../lib/db"; 

export default async function handler(req, res) {
   if (req.method === 'POST') {
         const { username, task } = req.body;  

      if (!username || !task) {
         return res.status(400).json({ error: "Username and task are required" });
      }

      try {
         const { database } = await connectToDatabase();
         const usersCollection = database.collection("users");

         const user = await usersCollection.findOne({ username });

            if (!user) {
               return res.status(404).json({ error: "User not found" });
            }

            const newTask = {
               name: task,
               completed: false,
            };

            const updatedUser = await usersCollection.updateOne(
            { username },  
               {
                  $push: { tasks: newTask }, 
               }
            );

            if (updatedUser.modifiedCount === 0) {
               return res.status(500).json({ error: "Failed to add task" });
            }

            res.status(201).json(newTask);

      } catch (error) {
         console.error("Error adding task:", error);
         res.status(500).json({ error: "Internal Server Error" });
      }
   } else {
      res.status(405).json({ error: "Method Not Allowed" });
   }
}


