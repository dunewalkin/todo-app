import { connectToDatabase } from "../../lib/db"; // Подключение к базе данных
import argon2 from "argon2"; // Для хеширования паролей

export default async function handler(req, res) {
    const { method } = req;

    if (method === "POST") {
        const { username, password } = req.body;

        try {
            const { database } = await connectToDatabase();
            const coll = database.collection("users");

            const existingUser = await coll.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ error: "User already exists" });
            }

            const hashedPassword = await argon2.hash(password);
            const newUser = { username, password: hashedPassword, tasks: [] };

            await coll.insertOne(newUser);
            res.status(201).json({ success: true, redirect: "/login" });
        } catch (error) {
            res.status(500).json({ error: "Registration error" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
