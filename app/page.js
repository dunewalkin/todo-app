"use client";

import { useState, useEffect } from "react";

export default function Home() {
    const [users, setUsers] = useState([]);
    const [newUsername, setNewUsername] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            const results = await fetch("/api/list").then((response) => response.json());
            setUsers(results);
        })();
    }, []);

    const handleAddUser = async () => {
        if (!newUsername.trim()) {
            setError("Username cannot be empty");
            return;
        }

        try {
            const response = await fetch("/api/addUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: newUsername }),
            });

            const result = await response.json();
            if (response.ok) {
                setUsers((prevUsers) => [...prevUsers, result.user]);
                setNewUsername(""); // Очистить поле ввода
                setError(null);
            } else {
                setError(result.error || "Failed to add user");
            }
        } catch (err) {
            setError("An error occurred while adding the user");
        }
    };

    return (
        <div>
            <main>
                <h1>MongoDB with <a href="https://nextjs.org">Next.js!</a> Example</h1>
                <div>
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                    <button onClick={handleAddUser}>Add User</button>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
                <br />
                <div>
                    {users.map((user) => (
                        <div key={user._id}>
                            <h2>{user.username}</h2>
                            <p>ID: {user._id}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
