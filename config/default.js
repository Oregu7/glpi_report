// загружаем переменные окружения
require("dotenv").config();
// необходимые переменные окружения
const REQUIRED_VARIABLES = [
    "DB_HOST",
    "DB_NAME",
    "DB_USER",
    "DB_PASSWORD",
    "SERVER_KEY",
    "SERVER_CRT",
];
REQUIRED_VARIABLES.forEach((name) => {
    if (!process.env[name]) {
        throw new Error(`Environment variable ${name} is missing`);
    }
});

// шарим конфиг
module.exports = {
    server: {
        port: Number(process.env.PORT),
        ip: process.env.IP,
        serverKey: process.env.SERVER_KEY,
        serverCrt: process.env.SERVER_CRT,
    },
    database: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
};