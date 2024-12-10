import { connectToDatabase } from "../../../lib/db";
import jwt from "jsonwebtoken";
import { parse } from "cookie"; 

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
   if (req.method !== "DELETE") {
      return res.status(405).json({ error: "Method Not Allowed" });
   }

   const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
   const token = cookies.token;

   if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
   }

   try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const username = decoded.username;

      const { name } = req.body; 

      if (!name) {
         return res.status(400).json({ error: "Task name is required" });
      }

      const { database } = await connectToDatabase();
      const usersCollection = database.collection("users");

      const deleteResult = await usersCollection.updateOne(
         { username },
         { $pull: { tasks: { name } } } 
      );

      if (deleteResult.modifiedCount > 0) {
         return res.status(200).json({ message: "Task deleted successfully" });
      } else {
         return res.status(404).json({ error: "Task not found or already deleted" });
      }
   } catch (error) {
      console.error("Error deleting task:", error);
      return res.status(500).json({ error: "Internal Server Error" });
   }
}
