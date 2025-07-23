import withLogger from "./withLogger";

export interface CounterProps {
  value: number;
  decOne: () => void;
  addOne: () => void;
}

export function Counter({ value, decOne, addOne }: CounterProps) {
  // console.log({ value, decOne, addOne });
  return (
    <div>
      <button onClick={decOne}>-</button>
      <span>{value}</span>
      <button onClick={addOne}>+</button>
    </div>
  );
}

export const LoggedCounter = withLogger(Counter);
