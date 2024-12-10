import { parse } from 'cookie'; 
import { connectToDatabase } from "../../lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
   const { method } = req;

   const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
   const token = cookies.token;

   if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
   }

   try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const username = decoded.username;

      const { database } = await connectToDatabase();
      const userCollection = database.collection(process.env.NEXT_ATLAS_COLLECTION);

         switch (method) {
            case "GET":
               const user = await userCollection.findOne({ username });

               if (!user || !user.tasks || user.tasks.length === 0) {
                  return res.status(404).json({ message: "No tasks found for this user" });
               }

               const tasks = user.tasks
               .map(task => ({
                  name: task.name,
                  completed: task.completed || false, 
               }))
               .sort((a, b) => a.completed - b.completed); 

               return res.status(200).json({ tasks });

            default:
               return res.status(405).json({ error: "Method Not Allowed" });
         }
   } catch (error) {
      console.error("Token verification or database error:", error);
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
   }
}
