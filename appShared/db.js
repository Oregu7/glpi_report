const Sequelize = require("sequelize");
const config = require("config");
const database = config.get("database");

const sequelize = new Sequelize(database.name, database.user, database.password, {
    host: database.host,
    dialect: "mysql",
    logging: false,
});


async function getItilsolutions() {
    const sqlQuery = "SELECT id, items_id, content from glpi_itilsolutions where itemtype='Ticket';";
    const [data] = await sequelize.query(sqlQuery);
    return data;
}

module.exports = {
    sequelize,
    getItilsolutions,
};