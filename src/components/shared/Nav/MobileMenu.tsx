import Link from "next/link";
import styles from "./MobileMenu.module.css";

interface MobileMenuProps {
  links: { href: string; label: string }[];
  onClose: () => void;
}

export function MobileMenu({ links, onClose }: MobileMenuProps) {
  return (
    <div
      className={styles.mobileMenu}
      role="dialog"
      aria-label="Navigation menu"
    >
      <nav className={styles.mobileNav}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={styles.mobileNavLink}
            onClick={onClose}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className={styles.mobileMenuFooter}>
        <Link href="/login" className={styles.mobileNavLink} onClick={onClose}>
          Sign In
        </Link>
        <Link href="/register" className={styles.mobileCta} onClick={onClose}>
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default MobileMenu;
