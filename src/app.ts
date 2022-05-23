import express, { Application, json, urlencoded } from "express";
import routes from "./routes";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import config from "./config";
import fileUpload from "express-fileupload";

const app: Application = express();
const port = config.app.port;

/**
 * ? Fileupload
 */
app.use(fileUpload({
    createParentPath: true,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB,
    debug: true
}))

/**
 * ? Middlewares
 */
app.use(
    cors(),
    json(),
    urlencoded({ extended: true }),
    morgan("dev"),
    helmet()
);

/**
 * ? Routes
 */
app.use("/api", routes);

/**
 * ? Listen on port
 */
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;