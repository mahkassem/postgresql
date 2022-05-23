import nodemailer from 'nodemailer';
import config from '../config';

const conf = {
    host: config.mail.host,
    port: config.mail.port,
    auth: {
        user: config.mail.user,
        pass: config.mail.pass
    },
    debug: config.mail.debug,
    logger: config.mail.logger
};

console.log(conf);

const mail = nodemailer.createTransport(conf)

export default mail;