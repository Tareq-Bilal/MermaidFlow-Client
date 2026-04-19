import { HTMLAttributes, ReactNode } from 'react';
import styles from './Container.module.css';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  children: ReactNode;
}

export function Container({ 
  size = 'lg', 
  children, 
  className = '', 
  ...props 
}: ContainerProps) {
  const classNames = `${styles.container} ${styles[size]} ${className}`.trim();

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}

export default Container;