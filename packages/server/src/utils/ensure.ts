export function ensure<T>(
  argument: T | undefined | null,
  message: string = 'This value was promised to be there.',
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }
  // ODg0OS0zNzQy
  return argument;
}
