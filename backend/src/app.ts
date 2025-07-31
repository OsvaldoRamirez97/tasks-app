import express from "express";
import taskRoutes from "./routes/taskRoutes";
import cors from "cors";

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}))
app.use(express.json());
app.use(taskRoutes);

app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada." });
});

export default app;