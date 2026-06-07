import styles from './Footer.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Link href="/">
            <Image 
              src="/assets/logoTransparent.png" 
              alt="MeghaHome Logo" 
              width={1000} 
              height={500} 
              className={styles.logoImage}
            />
          </Link>
        </div>
        
        <div className={styles.links}>
          <h4>Locations</h4>
          <ul>
            <li><Link href="#">Ghaziabad</Link></li>
            <li><Link href="#">Indirapuram</Link></li>
            <li><Link href="#">Vaishali</Link></li>
            <li><Link href="#">Noida</Link></li>
          </ul>
        </div>
        
        <div className={styles.links}>
          <h4>Services</h4>
          <ul>
            <li><Link href="#">Property Buying</Link></li>
            <li><Link href="#">Investment Consultation</Link></li>
            <li><Link href="#">Mortgage Guidance</Link></li>
            <li><Link href="#">Financial Planning</Link></li>
          </ul>
        </div>

        <div className={styles.links}>
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:sulabh@meghashomesolutionandfinancialservices.com">sulabh@meghashomesolutionandfinancialservices.com</a></li>
            <li><a href="tel:+919910384484">+91 99103 84484</a></li>
          </ul>
        </div>
      </div>
      
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} MeghaHome. All rights reserved.</p>
      </div>
    </footer>
  );
}