"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Contact.module.scss';

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
            <h2 className={styles.title}>Ready to elevate your <span className={styles.italic}>portfolio?</span></h2>
            <p className={styles.subtitleText}>Connect with our advisory board for customized real estate solutions and comprehensive wealth management.</p>
            <div className={styles.infoCard}>
              <p>Personal consultations, property guidance, and financial advisory tailored to your goals.</p>
            </div>
          </div>

          <div className={styles.formWrap} ref={formRef}>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.formHeader}>
                <h3>Start a conversation</h3>
                <p>Share your requirements and we will respond with the right next step.</p>
              </div>
              <div className={styles.row}>
                <label>
                  <span>Name</span>
                  <input className={styles.fieldInput} type="text" name="name" placeholder="Your name" required />
                </label>
                <label>
                  <span>Email</span>
                  <input className={styles.fieldInput} type="email" name="email" placeholder="Email address" required />
                </label>
              </div>
              <label className={styles.messageField}>
                <span>Message</span>
                <textarea className={styles.messageInput} name="message" placeholder="Tell us about your needs" rows={6} required />
              </label>
              <div className={styles.actions}>
                <button className={styles.submitBtn} type="submit">Send Message</button>
                <p className={styles.note}>We usually respond within one business day.</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}