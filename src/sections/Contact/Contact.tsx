"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MessageCircle, Mail } from 'lucide-react';
import styles from './Contact.module.scss';
import AnimatedTitle from '../../components/AnimatedTitle/AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(formRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
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
    <section className={styles.contact} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.splitLayout}>
          <div className={styles.header}>
            <span className={styles.subtitle}>Contact</span>
            <AnimatedTitle as="h2" className={styles.title}>Ready to elevate your <span className={styles.italic}>portfolio?</span></AnimatedTitle>
            <p className={styles.subtitleText}>Connect with our advisory board for customized real estate solutions and comprehensive wealth management.</p>
            <div className={styles.infoCard}>
              <p>Personal consultations, property guidance, and financial advisory tailored to your goals.</p>
            </div>
          </div>

          <div className={styles.formWrap} ref={formRef}>
            <div className={styles.form}>
              <div className={styles.formHeader}>
                <h3>Start a conversation</h3>
                <p>Choose your preferred channel and we&apos;ll get back to you promptly.</p>
              </div>

              <div className={styles.actions}>
                <a
                  className={styles.submitBtn}
                  href="tel:+919910384484"
                >
                  <Phone size={20} />
                  Call Now
                </a>

                <a
                  className={styles.submitBtn}
                  href="https://wa.me/919910384484"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>

                <a
                  className={styles.submitBtn}
                  href="mailto:sulabh.hr@gmail.com"
                >
                  <Mail size={20} />
                  Email Us
                </a>
              </div>

              <p className={styles.note}>We usually respond within one business day.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}