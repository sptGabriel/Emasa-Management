import {WinstonProvider} from './implementations/logger/WinstonProvider';
import {MailtrapProvider} from './implementations/mail/MailtrapProvider';
import {BullProvider} from './implementations/queue/BullProvider';

export const providers = {
  mail: {
    mailtrap: MailtrapProvider,
  },
  logger: {
    winston: WinstonProvider,
  },
  queue: {
    bull: BullProvider,
  },
};
