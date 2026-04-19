import { HTMLAttributes, ReactNode } from 'react';
import styles from './Grid.module.css';

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type GridRows = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type GridJustify = 'start' | 'end' | 'center' | 'stretch';
export type GridAlign = 'start' | 'end' | 'center' | 'stretch';

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: GridColumns;
  rows?: GridRows;
  gap?: GridGap;
  justify?: GridJustify;
  align?: GridAlign;
  inline?: boolean;
  children: ReactNode;
}

export function Grid({ 
  columns = 4, 
  rows,
  gap = 'md',
  justify = 'stretch',
  align = 'stretch',
  inline = false,
  children, 
  className = '', 
  ...props 
}: GridProps) {
  const classNames = [
    styles.grid, 
    inline && styles.inline,
    styles[`cols${columns}`],
    rows && styles[`rows${rows}`],
    styles[`gap${capitalize(gap)}`],
    styles[`justify${capitalize(justify)}`],
    styles[`align${capitalize(align)}`],
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

export default Grid;