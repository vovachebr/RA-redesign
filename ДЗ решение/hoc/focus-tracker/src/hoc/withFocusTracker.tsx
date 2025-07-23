import React, {
  useState,
  useCallback,
  forwardRef,
  useRef,
  useImperativeHandle,
  type Ref,
  type FocusEvent,
  type ComponentType,
} from 'react';
import { composeEventHandlers } from '../utils/composeEventHandlers';

export interface FocusTrackerInjectedProps {
  isFocused: boolean;
  onFocusChange?: (isFocused: boolean) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
}

/**
 * HOC для отслеживания фокуса.
 * @param WrappedComponent — оборачиваемый компонент.
 */
export function withFocusTracker<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  type Props = Omit<P, keyof FocusTrackerInjectedProps> &
    Partial<FocusTrackerInjectedProps>;

  const ComponentWithFocusTracker = forwardRef<HTMLElement, Props>(
    (props, ref) => {
      const {
        onFocusChange,
        onFocus: onFocusProp,
        onBlur: onBlurProp,
        isFocused: _isFocusedProp,
        ...restProps
      } = props;

      const [isFocused, setIsFocused] = useState(false);
      const localRef = useRef<HTMLElement>(null);

      useImperativeHandle(ref, () => localRef.current as HTMLElement);

      const handleFocus = useCallback(
        (event: FocusEvent<HTMLElement>) => {
          if (!isFocused) {
            setIsFocused(true);
            onFocusChange?.(true);
          }
          onFocusProp?.(event);
        },
        [isFocused, onFocusChange, onFocusProp]
      );

      const handleBlur = useCallback(
        (event: FocusEvent<HTMLElement>) => {
          if (isFocused) {
            setIsFocused(false);
            onFocusChange?.(false);
          }
          onBlurProp?.(event);
        },
        [isFocused, onFocusChange, onBlurProp]
      );

      const isDomElement = typeof WrappedComponent === 'string';

      if (isDomElement) {
        // DOM-элемент — прокидываем ref и события напрямую
        return React.createElement(WrappedComponent, {
          ...restProps,
          ref: localRef,
          onFocus: composeEventHandlers(handleFocus, (restProps as any).onFocus),
          onBlur: composeEventHandlers(handleBlur, (restProps as any).onBlur),
          isFocused,
        } as P & { ref: Ref<HTMLElement> });
      } else {
        // Компонент — оборачиваем в span с ref и событиями
        return (
          <span
            ref={localRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            tabIndex={-1}
            style={{ display: 'inline-block' }}
          >
            <WrappedComponent {...(restProps as P)} isFocused={isFocused} />
          </span>
        );
      }
    }
  );

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  ComponentWithFocusTracker.displayName = `withFocusTracker(${wrappedComponentName})`;

  return ComponentWithFocusTracker;
}
