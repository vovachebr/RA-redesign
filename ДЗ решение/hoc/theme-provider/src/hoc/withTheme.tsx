import React from 'react';
import { ThemeType } from '../types';

interface WithThemeProps {
  theme: ThemeType;
}

export function withTheme<P extends object>(
  WrappedComponent: React.ComponentType<P & WithThemeProps>
) {
  // Используем forwardRef, чтобы поддержать ref, если нужно
  const ComponentWithTheme = React.forwardRef<unknown, P & WithThemeProps>(
    (props, ref) => {
      // Просто прокидываем все пропсы, включая theme и ref
      return <WrappedComponent {...props} ref={ref} />;
    }
  );

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  ComponentWithTheme.displayName = `withTheme(${wrappedComponentName})`;

  return ComponentWithTheme;
}
