"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Nav.module.css";
import { MobileMenu } from "./MobileMenu";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggle";

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
      const md = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--breakpoint-md",
        ),
      );
      if (window.innerWidth >= md) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={styles.navbar}>
      <div className={styles.logoGroup}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <Image
            src="/NavIcon.png"
            alt="Mermaid Flow logo"
            width={48}
            height={48}
            className={styles.logoIcon}
            priority
          />
          <span>{logo.text}</span>
        </Link>

        <nav className={styles.nav}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className={styles.navRight}>
        <ThemeToggle />
        <Show when="signed-out">
          <SignInButton>
            <button className={styles.navLink}>Sign In</button>
          </SignInButton>
          <SignUpButton>
            <button className={styles.cta}>Sign Up</button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
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
