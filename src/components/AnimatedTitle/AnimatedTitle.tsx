"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AnimatedTitle.module.scss';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  as?: 'h1' | 'h2';
  className?: string;
  children: React.ReactNode;
};

export default function AnimatedTitle({ as = 'h2', className = '', children }: Props) {
  const rootRef = useRef<HTMLElement | null>(null);
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
          toggleActions: 'restart none restart none',
        }
      });

      tl.to(linesRef.current, {
        y: 0,
        duration: 1.05,
        stagger: 0.12,
      });
    });

    return () => ctx.revert();
  }, []);

  const Tag = as as any;

  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <Tag className={`${styles.animatedTitle} ${className}`} ref={rootRef as any}>
      {childrenArray.map((child, i) => (
        <span className={styles.line} key={i}>
          <span ref={el => { linesRef.current[i] = el as HTMLSpanElement }}>{child}</span>
        </span>
      ))}
    </Tag>
  );
}
