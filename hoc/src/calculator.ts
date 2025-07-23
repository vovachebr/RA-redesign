function mul(a: number, b: number): number {
 return a * b;
}

function add(a: number, b: number): number {
 return a + b;
}

function div(a: number, b: number): number {
 return a / b;
}

function sub(a: number, b: number): number {
 return a - b;
}

function withLogger(tag: string, operation: (a: number, b: number) => number) {
  return function (...args: [number, number]) {
    console.log(tag, ...args);
    return operation(...args);
  };
}

const loggedNumberAdd = withLogger('сумма', add);
loggedNumberAdd(10, 2); // сумма 10 2