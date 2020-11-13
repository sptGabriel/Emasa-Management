export interface Command {
  getName(): string;
  execute(): void;
  undo(): void;
}
