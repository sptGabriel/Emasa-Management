import { Dictionary } from '../dictionary';
import { Command } from './command';
export type Type<T = unknown> = new (...arguments_: readonly any[]) => T;
export abstract class CommandBus {
  private handlers: { [k: string]: Command } = {};
  constructor(...params: Command[]) {
    params.forEach(command => {
      if (!command.getName()) return;
      this.handlers[command.getName()] = command;
    });
  }

  protected registerCommand = (command: Type<Command>): void => {
    if (!command.name) return;
    const hasCommand = this.handlers[command.name];
    if (hasCommand) throw new Error(`Command ${command.name} already exists`);
    this.handlers[command.name] = command.prototype;
  };

  protected executeCommand = async (command: Type<Command>): Promise<any> => {
    const hasCommand = this.handlers[command.name];
    if (!hasCommand) throw new Error(`Command ${command.name} dont exists`);
    return await hasCommand.execute();
  };

  protected undoCommand = async <TCommand extends Command>(
    command: TCommand,
  ): Promise<any> => {};
}
