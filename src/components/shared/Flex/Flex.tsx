import { HTMLAttributes, ReactNode } from 'react';
import styles from './Flex.module.css';

export type FlexDirection = 'row' | 'rowReverse' | 'column' | 'columnReverse';
export type FlexJustify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
export type FlexAlign = 'start' | 'end' | 'center' | 'stretch' | 'baseline';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrapReverse';
export type FlexGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction?: FlexDirection;
  justify?: FlexJustify;
  align?: FlexAlign;
  wrap?: FlexWrap;
  gap?: FlexGap;
  inline?: boolean;
  children: ReactNode;
}

export function Flex({ 
  direction = 'row', 
  justify = 'start', 
  align = 'stretch',
  wrap = 'nowrap',
  gap = 'none',
  inline = false,
  children, 
  className = '', 
  ...props 
}: FlexProps) {
  const classNames = [
    styles.flex, 
    inline && styles.inline,
    styles[`dir${capitalize(direction)}`],
    styles[`justify${capitalize(justify)}`],
    styles[`align${capitalize(align)}`],
    styles[`wrap${capitalize(wrap)}`],
    styles[`gap${capitalize(gap)}`],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}

function capitalize(str: string): string {
  if (str === '2xl') return '2xl';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default Flex;