import { QueueOptions } from 'bull';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
interface MailConfig {
  queue: QueueOptions;

  config: {
    mailtrap: SMTPTransport.Options;
  };
}

export default {
  queue: {
    defaultJobOptions: {
      removeOnComplete: true,
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
    },
    limiter: {
      max: 150,
      duration: 1000,
    },
  },

  config: {
    mailtrap: {
      host: process.env.MAILTRAP_HOST,
			port: process.env.MAILTRAP_PORT,
			secure: false,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    },
  },
} as MailConfig;