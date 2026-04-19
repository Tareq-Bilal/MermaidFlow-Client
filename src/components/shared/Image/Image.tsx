import { ImgHTMLAttributes } from 'react';
import styles from './Image.module.css';

export type ImageFit = 'cover' | 'contain' | 'fill' | 'none';
export type ImageShape = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fit?: ImageFit;
  shape?: ImageShape;
  lazy?: boolean;
}

export function Image({ 
  fit = 'cover', 
  shape = 'none',
  lazy = true,
  className = '', 
  ...props 
}: ImageProps) {
  const classNames = [
    styles.image,
    styles[fit],
    shape !== 'none' && styles[`shape${capitalize(shape)}`],
    className,
  ].filter(Boolean).join(' ');

  return (
    <img 
      loading={lazy ? 'lazy' : 'eager'} 
      className={classNames} 
      {...props} 
    />
  );
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default Image;