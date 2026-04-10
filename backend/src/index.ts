import app from "./app";
import "./models/association";
import sequelize from "./config/database";

const port = 3000;

async function main() {
    try {
        await sequelize.authenticate();
        console.log("DB establecida");

        await sequelize.sync({ alter: true });
        console.log("DB sincronizada");

        app.listen(port, () => {
            console.log(`Servidor corriendo en http://localhost:${port}`)
        })
    } catch (error) {
        console.error("Error al iniciar el servidor")
    }
};

main();