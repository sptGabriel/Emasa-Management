export const isString = (thing: any) =>
  Object.prototype.toString.call(thing) === '[object String]';
