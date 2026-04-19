import { HTMLAttributes, ReactNode } from 'react';
import styles from './GridItem.module.css';

export interface GridItemProps extends HTMLAttributes<HTMLDivElement> {
  columnStart?: number;
  columnEnd?: number;
  rowStart?: number;
  rowEnd?: number;
  column?: number;
  row?: number;
  children: ReactNode;
}

export function GridItem({ 
  columnStart,
  columnEnd,
  rowStart,
  rowEnd,
  column,
  row,
  children, 
  className = '', 
  ...props 
}: GridItemProps) {
  const classNames = `${styles.gridItem} ${className}`.trim();

  const style = {
    ...(columnStart && { gridColumnStart: columnStart }),
    ...(columnEnd && { gridColumnEnd: columnEnd }),
    ...(rowStart && { gridRowStart: rowStart }),
    ...(rowEnd && { gridRowEnd: rowEnd }),
    ...(column && { gridColumn: `span ${column} / span ${column}` }),
    ...(row && { gridRow: `span ${row} / span ${row}` }),
    ...props.style,
  };

  return (
    <div className={classNames} style={style} {...props}>
      {children}
    </div>
  );
}

export default GridItem;