import React, { useEffect, useState, type ReactElement } from "react";
import type { Order } from "./interfaces";

export function withData<P>(
  Component: React.ComponentType<P>,
  endpoint: string | ((id: number) => string),
  propName: string,
): (props: P & {id?: number}) => ReactElement | null {
  return (props: P & {id?: number}): ReactElement | null => {
    const [data, setData] = useState<Order[]>();
    
    useEffect(() => {
      async function fetchOrder() {
        if (typeof endpoint === 'function') {
          endpoint = endpoint(Number(props.id));
        }
        const response = await fetch(endpoint);
        const data = await response.json();
        setData(data);
      }
  
      fetchOrder();
    }, [props, setData]);

    return <Component {...props} {...{ [propName]: data} }/>;
  };
}