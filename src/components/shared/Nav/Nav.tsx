import { ReactNode } from 'react';
import Link from 'next/link';
import styles from './Nav.module.css';

export type NavVariant = 'default';

export interface NavLink {
  href: string;
  label: string;
}

export interface NavProps {
  links?: NavLink[];
  logo?: {
    text: string;
    icon?: ReactNode;
  };
}

export function Nav({ links = [], logo = { text: 'Mermaid Flow' } }: NavProps) {
  return (
    <header className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <div className={styles.logoIcon} />
        <span>{logo.text}</span>
      </Link>

      <nav className={styles.nav}>
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={styles.navLink}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className={styles.navRight}>
        <Link href="/login" className={styles.navLink}>
          Sign In
        </Link>
        <Link href="/download" className={styles.cta}>
          Download
        </Link>
      </div>
    </header>
  );
}

export default Nav;