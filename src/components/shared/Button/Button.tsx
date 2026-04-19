import { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

export type ButtonVariant = 'primaryPill' | 'secondary' | 'ghost' | 'cta';

interface BaseProps {
  variant?: ButtonVariant;
  className?: string;
}

interface ButtonProps extends BaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: never;
}

interface LinkProps extends BaseProps {
  children: ReactNode;
  href: string;
  onClick?: () => void;
}

type Props = ButtonProps | LinkProps;

export function Button(props: Props) {
  const { variant = 'primaryPill', children, className = '' } = props;
  
  const classNames = `${styles.button} ${styles[variant]} ${className}`.trim();

  if ('href' in props && props.href) {
    return (
      <Link href={props.href} className={classNames}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classNames} {...(props as ButtonProps)}>
      {children}
    </button>
  );
}

export default Button;