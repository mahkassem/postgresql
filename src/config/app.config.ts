import dotenv from "dotenv";

dotenv.config();

const appConfig = {
    port: process.env.PORT || 3000,
    bcryptRounds: Number(process.env.BCRYPT_ROUNDS) || 8,
    bcryptPapper: process.env.BCRYPT_PAPPER,
    jwtSecret: process.env.JWT_SECRET as string,
}

export default appConfig;