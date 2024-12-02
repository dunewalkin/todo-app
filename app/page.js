"use client";

import { useEffect, useState } from "react";

export default function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const results = await fetch("/api/list").then(response => response.json());
                setUsers(results); // Устанавливаем данные
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        })();
    }, []);

    return (
        <div>
            <main>
                <h1>MongoDB with <a href="https://nextjs.org">Next.js!</a> Example</h1>
                <br />
                <div>
                    {users.map(user => (
                        <div key={user._id}>
                              <h2>{user.username}</h2>
                              <p>{user.password}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
