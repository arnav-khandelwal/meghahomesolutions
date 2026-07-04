'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change / link click
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" onClick={closeMenu}>
          <Image 
            src="/assets/logoTransparent.png" 
            alt="MeghaHome Logo" 
            width={180} 
            height={60} 
            className={styles.logoImage}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav}>
          <Link href="/#about">About</Link>
          <Link href="/#services">Services</Link>
          <Link href="/#testimonials">Testimonials</Link>
          <Link href="/#contact">Contact</Link>
        </nav>

        {/* Hamburger Button */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.active : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileNav}>
          <Link href="/#about" onClick={closeMenu}>About</Link>
          <Link href="/#services" onClick={closeMenu}>Services</Link>
          <Link href="/#testimonials" onClick={closeMenu}>Testimonials</Link>
          <Link href="/#contact" onClick={closeMenu}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}