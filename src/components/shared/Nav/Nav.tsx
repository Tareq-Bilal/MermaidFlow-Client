"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Nav.module.css";
import { MobileMenu } from "./MobileMenu";

export type NavVariant = "default";

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

export function Nav({ links = [], logo = { text: "Mermaid Flow" } }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={styles.navbar}>
      <Link href="/" className={styles.logo} onClick={closeMenu}>
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
        <Link href="/register" className={styles.cta}>
          Sign Up
        </Link>
      </div>

      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {menuOpen && <MobileMenu links={links} onClose={closeMenu} />}
    </header>
  );
}

export default Nav;
