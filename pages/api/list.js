import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(request, response) {
   try {
      const { database } = await connectToDatabase();
      const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);

      const results = await collection.find({})
         .project({
               username: 1, 
               password: 1, 
         })
         .limit(10)
         .toArray();

      // Преобразуем ObjectId в строку
      const formattedResults = results.map(username => ({
         ...username,
         _id: username._id.toString(),
      }));

      response.status(200).json(formattedResults);
   } catch (error) {
      console.error("Error fetching users:", error);
      response.status(500).json({ error: "Internal Server Error" });
   }
}
