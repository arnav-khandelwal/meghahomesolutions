'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.scss';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleLinesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        defaults: { ease: 'power4.out' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          // restart on both forward and backward entry so animations re-run
          toggleActions: 'restart none restart none',
        }
      });

      tl.to(titleLinesRef.current, {
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        delay: 0.2,
      })
      .to([subtitleRef.current, actionsRef.current], {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
      }, '-=0.8');
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} ref={sectionRef}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.line}>
            <span ref={el => { titleLinesRef.current[0] = el }}>Elevating <span className={styles.italic}>Real Estate</span></span>
          </span>
          <span className={styles.line}>
            <span ref={el => { titleLinesRef.current[1] = el }}>
              & <span className={styles.italic}>Financial</span> Advisory
            </span>
          </span>
          <span className={styles.line}>
            <span ref={el => { titleLinesRef.current[2] = el }}>to an Art Form.</span>
          </span>
        </h1>
        
        <p className={styles.subtitle} ref={subtitleRef}>
          Exclusive properties and tailored wealth management in Ghaziabad, Noida, and NCR. Experience the premium standard of property acquisition and investment consulting.
        </p>
        
        <div className={styles.actions} ref={actionsRef}>
          <button className={styles.primaryBtn}>Explore Properties</button>
          <button className={styles.secondaryBtn}>Our Services</button>
        </div>
      </div>
    </section>
  );
}
