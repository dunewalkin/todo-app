import { withIronSessionApiRoute } from "iron-session"; // Именованный импорт

export const sessionOptions = {
    password: process.env.SESSION_SECRET, // Секрет для шифрования сессии
    cookieName: "my-todo-app-session",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production", // Включить secure cookie в продакшн
    },
};

export function withSession(handler) {
    return withIronSessionApiRoute(handler, sessionOptions);
}
