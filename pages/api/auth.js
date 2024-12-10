import { connectToDatabase } from "../../lib/db"; 
import argon2 from "argon2"; 
import jwt from 'jsonwebtoken'; 
import { serialize } from 'cookie'; 

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
            const token = jwt.sign(
               { username: user.username },
               JWT_SECRET,
               { expiresIn: '1h' } 
            );

            res.setHeader('Set-Cookie', serialize('token', token, {
               httpOnly: true,
               secure: process.env.NODE_ENV === 'production', 
               sameSite: 'Strict',
               maxAge: 3600, 
               path: '/', 
            }));

            console.log('Cookie set:', serialize('token', token, {
               httpOnly: true,
               secure: process.env.NODE_ENV === 'production',
               sameSite: 'Strict',
               maxAge: 3600,
               path: '/',
            }));

            res.status(200).json({ message: "Login successful" });
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
