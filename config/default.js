// загружаем переменные окружения
require("dotenv").config();
// необходимые переменные окружения
const REQUIRED_VARIABLES = [
    "DB_HOST",
    "DB_NAME",
    "DB_USER",
    "DB_PASSWORD",
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
    },
    database: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
};