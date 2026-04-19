import { HTMLAttributes, ReactNode } from 'react';
import styles from './FlexItem.module.css';

export type FlexItemGrow = 0 | 1 | 2 | 3 | 4 | 5;
export type FlexItemShrink = 0 | 1;

export interface FlexItemProps extends HTMLAttributes<HTMLDivElement> {
  grow?: FlexItemGrow;
  shrink?: FlexItemShrink;
  basis?: string;
  order?: number;
  children: ReactNode;
}

export function FlexItem({ 
  grow = 1, 
  shrink = 1,
  basis = 'auto',
  order = 0,
  children, 
  className = '', 
  ...props 
}: FlexItemProps) {
  const classNames = `${styles.flexItem} ${className}`.trim();

  const style = {
    flexGrow: grow,
    flexShrink: shrink,
    flexBasis: basis,
    order,
    ...props.style,
  };

  return (
    <div className={classNames} style={style} {...props}>
      {children}
    </div>
  );
}

export default FlexItem;