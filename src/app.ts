import express, { Application, json } from "express";
import routes from "./routes";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import config from "./config";

const app: Application = express();
const port = config.app.port;

/**
 * ? Middlewares
 */
app.use(
    cors(),
    helmet(),
    json(),
    morgan("dev"));

/**
 * ? Routes
 */
app.use(routes);

/**
 * ? Listen on port
 */
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});