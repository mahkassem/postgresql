import dotenv from "dotenv";
import path from "path";

dotenv.config();

const appConfig = {
    port: process.env.PORT || 3000,
    bcryptRounds: Number(process.env.BCRYPT_ROUNDS) || 8,
    bcryptPapper: process.env.BCRYPT_PAPPER,
    jwtSecret: process.env.JWT_SECRET as string,
    storage_url: process.env.STORAGE_URL as string,
    defaultEmail: process.env.DEFAULT_EMAIL as string,
}

appConfig.storage_url = path.join(__dirname, '../../', appConfig.storage_url);

export default appConfig;