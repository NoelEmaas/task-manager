import express from 'express';
import cors from 'cors';
import database from './database/index.js';
import { taskRouter } from './routers/task.router.js';
import { PORT } from './config/index.js';

const app = express();

database.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/task", taskRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});