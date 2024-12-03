import { connectToDatabase } from "../../lib/db";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { username } = req.body; // Получаем username из запроса
            if (!username || username.trim() === "") {
                return res.status(400).json({ error: "Username is required" });
            }

            const { database } = await connectToDatabase();
            const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);

            const result = await collection.insertOne({
                username: username.trim(),
                password: "$argon2id$dummy$hash", // Здесь используем заглушку для пароля
                createdAt: new Date(),
            });

            return res.status(201).json({ success: true, user: { _id: result.insertedId, username } });
        } catch (error) {
            console.error("Error adding user:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
}
