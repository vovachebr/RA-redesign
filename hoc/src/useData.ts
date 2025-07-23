import { useState, useEffect } from "react";

export function useData<T, U>(
  endpoint: string,
  dataToState: (data: T) => U
): U | undefined {
  const [state, setState] = useState<U>();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(endpoint);
      const data: T = await response.json();
      setState(dataToState(data));
    }

    fetchData();
  }, [dataToState, endpoint]);

  return state;
}