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
            <li>Ghaziabad</li>
            <li>Indirapuram</li>
            <li>Vaishali</li>
            <li>Noida</li>
          </ul>
        </div>
        
        <div className={styles.links}>
          <h4>Services</h4>
          <ul>
            <li>Property Buying</li>
            <li>Investment Consultation</li>
            <li>Mortgage Guidance</li>
            <li>Financial Planning</li>
          </ul>
        </div>

        <div className={styles.links}>
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:sulabh.hr@gmail.com">sulabh.hr@gmail.com</a></li>
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