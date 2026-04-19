import { HTMLAttributes, ReactNode } from 'react';
import styles from './Text.module.css';

export type TextVariant = 'display' | 'section' | 'heading' | 'cardHeading' | 'subheading' | 'bodyLarge' | 'body' | 'caption' | 'small';
export type TextColor = 'primary' | 'secondary' | 'muted' | 'accent';
export type TextAlign = 'left' | 'center' | 'right';
export type TextWeight = 'regular' | 'medium' | 'semibold';

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: TextVariant;
  color?: TextColor;
  align?: TextAlign;
  weight?: TextWeight;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'strong' | 'em';
  children: ReactNode;
}

export function Text({ 
  variant = 'body', 
  color = 'primary', 
  align = 'left', 
  weight = 'regular',
  as: Component = 'p',
  className = '', 
  ...props 
}: TextProps) {
  const classNames = [
    styles.text,
    styles[variant],
    styles[`color${capitalize(color)}`],
    styles[`align${capitalize(align)}`],
    styles[`weight${capitalize(weight)}`],
    className,
  ].filter(Boolean).join(' ');

  return <Component className={classNames} {...props} />;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default Text;