import { connect, connection, Connection } from 'mongoose';
import mongoConfig from '@config/mongo';
import { inject, injectable } from 'tsyringe';
import LoggerProvider from '@shared/adapters/models/LoggerProvider';
import { IDatabaseORM } from '@shared/core/orm';

const mongoUserPass = mongoConfig.username
  ? `${mongoConfig.username}:${mongoConfig.password}@`
  : '';
const mongoUrl = `mongodb://${mongoUserPass}${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`;
const mongoOpt = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

@injectable()
export class MongoDB implements IDatabaseORM {
  private _db: Connection;

  constructor(
    @inject('LoggerProvider') private loggerProvider: LoggerProvider,
  ) {}

  public close = (): Promise<void> => this._db.close();

  public connect = async (): Promise<void> => {
    await connect(mongoUrl, mongoOpt)
      .then(() => this.connected())
      .catch(err => this.error(err));
    this._db = connection;
  };

  private connected() {
    this.loggerProvider.log('info', 'Mongoose has connected');
  }

  private error(error: Error) {
    this.loggerProvider.log('error', 'Mongoose has errored', { error });
  }
}
