export function composeEventHandlers<E>(
  ...handlers: Array<((event: E) => void) | undefined>
): (event: E) => void {
  return (event: E) => {
    handlers.forEach((handler) => {
      if (handler) {
        handler(event);
      }
    });
  };
}