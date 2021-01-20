import { injectable, inject } from 'tsyringe';
import LoggerProvider from '@shared/adapters/models/LoggerProvider';
import MailProvider, { Message } from '@shared/adapters/models/MailProvider';
import QueueProvider from '@shared/adapters/models/QueueProvider';
import { IUseCase } from '@shared/core/useCase';

@injectable()
class ProcessQueueService implements IUseCase<void, void> {
  constructor(
    @inject('QueueProvider') private queueProvider: QueueProvider,
    @inject('MailProvider') private mailProvider: MailProvider,
    @inject('LoggerProvider') private loggerProvider: LoggerProvider,
  ) {}
  execute(): void {
    this.queueProvider.process(async job => {
      const { body, from, subject, to } = job.data as Message;

      try {
        await this.mailProvider.sendEmail({
          body,
          from,
          subject,
          to,
        });

        this.loggerProvider.log('info', `[${subject}] Sent message to ${to}`);
      } catch (err) {
        this.loggerProvider.log(
          'error',
          `[${subject}] Failed to send message to ${to}`,
        );
        throw err;
      }
    });
  }
}

export default ProcessQueueService;
