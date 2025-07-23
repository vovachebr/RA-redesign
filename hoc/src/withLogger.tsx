import React, { type ReactElement } from "react";
import type { CounterProps } from "./Counter";

export function withLogger<P extends CounterProps>(
  Component: React.ComponentType<P>
): (props: P) => ReactElement | null {
  return (props: P): ReactElement | null => {
    console.log(props);
    return <Component {...props} />;
  };
}