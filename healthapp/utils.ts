export const isNotNumber = (args: unknown): boolean => 
  isNaN(Number(args));

export default isNotNumber;