'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Services.module.scss';
import { Building2, Landmark, Home, Banknote, Briefcase, FileSignature, ShieldCheck, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  { title: 'Property Buying', desc: 'Expert assistance in finding your perfect property.', icon: Building2 },
  { title: 'Property Selling', desc: 'Strategic marketing and selling advisory.', icon: Home },
  { title: 'Investment Consultation', desc: 'Data-driven real estate investment strategies.', icon: Landmark },
  { title: 'Interior Designing', desc: 'Elegant interiors tailored to your space and taste.', icon: Briefcase },
  { title: 'Home Loan Assistance', desc: 'Seamless financing solutions from top lenders.', icon: Banknote },
  { title: 'Mortgage Guidance', desc: 'Restructuring and mortgage optimization.', icon: FileSignature },
  { title: 'Financial Planning', desc: 'Holistic wealth and asset management.', icon: ShieldCheck },
  { title: 'Plot Selling', desc: 'Trusted guidance for premium land and plot transactions.', icon: MapPin },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'restart none none reverse',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.services} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Services</span>
          <h2 className={styles.title}>
            Bespoke <span className={styles.italic}>Services</span> & Solutions
          </h2>
        </div>
        
        <div className={styles.grid}>
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className={styles.card}
                ref={el => { cardsRef.current[index] = el }}
              >
                <Icon className={styles.icon} strokeWidth={1} />
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}