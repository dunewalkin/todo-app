import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
   if (req.method !== 'GET') {
      return res.status(405).json({ error: "Method Not Allowed" });
   }

   try {
      const token = req.cookies.token; 
      if (!token) {
         return res.status(401).json({ error: "Unauthorized: Token is missing" });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      const username = decoded.username;

      res.status(200).json({ username }); 
   } catch (error) {
      console.error("Error decoding token:", error);
      res.status(401).json({ error: "Unauthorized" });
   }
}
