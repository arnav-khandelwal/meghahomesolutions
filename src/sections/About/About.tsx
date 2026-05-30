'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import styles from './About.module.scss';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  const num1Ref = useRef<HTMLSpanElement>(null);
  const num2Ref = useRef<HTMLSpanElement>(null);
  const num3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'restart none none reverse',
        }
      });

      tl.fromTo(textRef.current, 
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      )
      .fromTo(imageRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' },
        '-=0.8'
      );
      
      // Counter animations
      if (num1Ref.current) {
        gsap.fromTo(num1Ref.current, { textContent: "0" }, {
          textContent: "15",
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: "top 65%",
            toggleActions: "restart none none reverse"
          }
        });
      }
      if (num2Ref.current) {
        gsap.fromTo(num2Ref.current, { textContent: "0" }, {
          textContent: "500",
          duration: 2.5,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: "top 65%",
            toggleActions: "restart none none reverse"
          }
        });
      }
      if (num3Ref.current) {
        gsap.fromTo(num3Ref.current, { textContent: "0" }, {
          textContent: "100",
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: "top 65%",
            toggleActions: "restart none none reverse"
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.about} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.content} ref={textRef}>
          <span className={styles.subtitle}>Our Legacy</span>
          <h2 className={styles.title}>
            A decade of <span className={styles.italic}>excellence</span> in 
            <br />
            <span className={styles.teal}>real estate</span>
          </h2>
          <p>
            At MeghaHome, we transcend traditional brokering. We curate experiences, safeguard investments, and build enduring wealth through strategic property acquisition and expert financial consulting. 
          </p>
          <p>
            Operating across premium locales including Ghaziabad, Indirapuram, Vaishali, Vasundhara, and Noida, our localized expertise ensures unmatched value creation for our clients.
          </p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.number}><span ref={num1Ref}>15</span>+</span>
              <span className={styles.label}>Years Experience</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.number}><span ref={num2Ref}>500</span>+</span>
              <span className={styles.label}>Properties Sold</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.number}><span ref={num3Ref}>100</span>%</span>
              <span className={styles.label}>Client Satisfaction</span>
            </div>
          </div>
        </div>

        <div className={styles.imageWrapper} ref={imageRef}>
          <div className={styles.accent} />
          <Image 
            src="/assets/housephoto.jpg" 
            alt="MeghaHome Property" 
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </section>
  );
}
