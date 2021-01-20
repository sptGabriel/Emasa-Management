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
      host: 'smtp.mailtrap.io',
			port: 2525,
			secure: false,
      auth: {
        user: '998d0cfee1c4db',
        pass: 'c1bd5d945aa0a1',
      },
    },
  },
} as MailConfig;