import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isFocused?: boolean;
  onFocusChange?: (isFocused: boolean) => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { isFocused, onFocusChange, ...rest } = props;
  return <input ref={ref} {...rest} />;
});