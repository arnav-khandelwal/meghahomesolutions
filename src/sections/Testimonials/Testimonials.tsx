'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Testimonials.module.scss';
import AnimatedTitle from '../../components/AnimatedTitle/AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    quote: "MeghaHome's meticulous approach to our real estate portfolio acquisition was unparalleled. They identified opportunities others missed.",
    author: "Alok S.",
    role: "Property Investor"
  },
  {
    quote: "Securing commercial space in Noida required nuanced local knowledge. Their financial models and advisory made the process flawless.",
    author: "Radhika M.",
    role: "Retail Entrepreneur"
  }
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current,
        { scale: 0.95, opacity: 0, y: 30 },
        { 
          scale: 1, opacity: 1, y: 0, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'restart none none reverse',
          }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.testimonials} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Client Experiences</span>
          <AnimatedTitle as="h2" className={styles.title}>
            Words of <span className={styles.italic}>Acclaim</span>
          </AnimatedTitle>
        </div>

        <div className={styles.grid}>
          {reviews.map((item, index) => (
            <div 
              key={index} 
              className={styles.card}
              ref={el => { cardsRef.current[index] = el }}
            >
              <div className={styles.quote}>&quot;</div>
              <p>{item.quote}</p>
              <div className={styles.author}>
                <h4>{item.author}</h4>
                <span>{item.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}