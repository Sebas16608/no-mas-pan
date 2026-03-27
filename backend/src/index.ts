import app from "./app";
const port = 3000;

async function main() {
    try {
        app.listen(port, () => {
            console.log(`Servidor corriendo en http://localhost:${port}`)
        })
    } catch (error) {
        console.error("Error al iniciar el servidor")
    }
};

main();