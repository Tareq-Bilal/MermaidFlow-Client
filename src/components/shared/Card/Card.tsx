import { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';

export type CardVariant = 'default' | 'elevated' | 'feature';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hoverable?: boolean;
  children: ReactNode;
}

export function Card({ 
  variant = 'default', 
  hoverable = false, 
  children, 
  className = '', 
  ...props 
}: CardProps) {
  const variantClass = variant === 'elevated' 
    ? styles.elevatedCard 
    : variant === 'feature' 
      ? styles.featureCard 
      : styles.card;

  const classNames = `${variantClass} ${hoverable ? styles.cardHover : ''} ${className}`.trim();

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}

export default Card;