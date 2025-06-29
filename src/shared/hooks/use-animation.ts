'use client';

import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export function useScrollAnimation(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: threshold 
  });

  return { ref, isInView };
}

export function useParallax(offset = 50) {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const speed = offset / 100;
        const yPos = rect.top * speed;
        setScrollY(yPos);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);

  return { ref, scrollY };
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
}

export function useMagneticHover(strength = 0.5) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;

    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return {
    ref,
    position,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  };
}

export function useStaggerAnimation(
  itemCount: number,
  baseDelay = 0,
  staggerDelay = 0.1
) {
  return Array.from({ length: itemCount }, (_, i) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay: baseDelay + i * staggerDelay,
      duration: 0.5,
      ease: 'easeOut',
    },
  }));
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY / totalHeight;
      setProgress(Math.min(Math.max(currentProgress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

export function useElementVisibility(threshold = 0.5) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
}

export function useAnimationState(initialState = 'idle') {
  const [animationState, setAnimationState] = useState(initialState);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = (state: string, duration = 1000) => {
    setAnimationState(state);
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, duration);
  };

  return { animationState, isAnimating, startAnimation };
}