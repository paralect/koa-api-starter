type $TSFixMe = any;
type $TSFixMeFunction = (...args: any[]) => any;

declare module 'hot-formula-parser' {
  type ParseErrors = '#DIV/0!' | '#NAME?' | '#N/A' | '#NUM!' | '#VALUE!';
  type Events = 'callVariable' | 'callFunction';
  type Done = (value: unknown) => void;

  class Parser {
    parse(expression: string): {
      error: null | ParseErrors;
      result: null | unknown;
    };
    setVariable(name: string, value: unknown): void;
    getVariable(name: string): unknown;
    setFunction(name: string, fn: (...params: unknown[]) => unknown);
    getFunction(name: string): (...params: unknown[]) => unknown;

    on(event: 'callVariable', callback: (name: string, done: Done) => void): void;
    on(event: 'callFunction', callback: (name: string, params: unknown[], done: Done) => void): void;
    on(event: 'callCellValue', callback: (cellCoord: unknown, done: Done) => void): void;
    on(event: 'callRangeValue', callback: (startCellCoord: unknown, endCellCoord: unknown, done: Done) => void): void;
  }

  // eslint-disable-next-line no-var
  var SUPPORTED_FORMULAS: string[];
}
