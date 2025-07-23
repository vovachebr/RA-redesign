import React from 'react';
import AccessDenied from '../components/AccessDenied';
import type { CurrentUser } from '../types';



interface WithAuthorizationProps {
  currentUser?: CurrentUser | null;
}

/**
 * HOC для контроля доступа по ролям без использования контекста.
 * @param WrappedComponent Компонент, доступ к которому нужно ограничить
 * @param allowedRoles Массив ролей, которым разрешён доступ
 */
function withAuthorization<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: string[]
) {
  // Возвращаем новый компонент, который ожидает пропс currentUser
  const WithAuthorization: React.FC<P & WithAuthorizationProps> = (props) => {
    const { currentUser, ...restProps } = props;

    if (!currentUser?.roles) {
      return <AccessDenied />;
    }

    const hasAccess = currentUser.roles.some((role) => allowedRoles.includes(role));

    if (!hasAccess) {
      return <AccessDenied />;
    }

    // Безопасно передаём остальные пропсы без currentUser
    return <WrappedComponent {...(restProps as P)} />;
  };

  // Для удобства дебага
  const wrappedName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithAuthorization.displayName = `withAuthorization(${wrappedName})`;

  return WithAuthorization;
}

export default withAuthorization;
