'"use client";'

"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Team.module.scss';
import AnimatedTitle from '../../components/AnimatedTitle/AnimatedTitle';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  { name: 'Megha Khandelwal', role: 'Co-founder', img: '/assets/logo.jpeg' },
  { name: 'Sulabh Khandelwal', role: 'Co-founder', img: '/assets/logoTransparent.png' },
];

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current,
        { y: 30, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'restart none restart none',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="team" className={styles.team} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Our People</span>
          <AnimatedTitle as="h2" className={styles.title}>The Team Behind <span className={styles.italic}>MeghaHome</span></AnimatedTitle>
        </div>

        <div className={styles.grid}>
          {teamMembers.map((m, i) => (
            <div key={i} className={styles.card} ref={el => { cardsRef.current[i] = el }}>
              <div className={styles.avatar}>
                <Image src={m.img} alt={m.name} fill style={{ objectFit: 'cover' }} />
              </div>
              <h3>{m.name}</h3>
              <span className={styles.role}>{m.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
