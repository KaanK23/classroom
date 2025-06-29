'use client';

import { motion, AnimatePresence, MotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import * as animations from '@/shared/utils/motion';

interface AnimatedProps extends MotionProps {
  children: ReactNode;
  animation?: keyof typeof animations;
  transition?: keyof typeof animations.transitions;
  delay?: number;
  duration?: number;
  className?: string;
  exitAnimation?: boolean;
}

export function Animated({
  children,
  animation = 'fadeIn',
  transition = 'smooth',
  delay = 0,
  duration,
  className,
  exitAnimation = true,
  ...motionProps
}: AnimatedProps) {
  const selectedAnimation = animations[animation as keyof typeof animations] as typeof animations.fadeIn || animations.fadeIn;
  const selectedTransition = animations.transitions[transition];

  const customTransition = {
    ...selectedTransition,
    delay,
    ...(duration && { duration }),
  };

  return (
    <motion.div
      variants={selectedAnimation}
      initial="initial"
      animate="animate"
      exit={exitAnimation ? "exit" : undefined}
      transition={customTransition}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function Stagger({ children, staggerDelay = 0.1, className }: StaggerProps) {
  return (
    <motion.div
      variants={{
        animate: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      initial="initial"
      animate="animate"
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxProps {
  children: ReactNode;
  offset?: number;
  className?: string;
}

export function Parallax({ children, offset = 50, className }: ParallaxProps) {
  return (
    <motion.div
      initial={{ y: offset }}
      animate={{ y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 30,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export function Reveal({ children, direction = 'up', delay = 0, className }: RevealProps) {
  const variants = {
    up: animations.fadeInUp,
    down: animations.fadeInDown,
    left: animations.fadeInLeft,
    right: animations.fadeInRight,
  };

  return (
    <motion.div
      variants={variants[direction]}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ ...animations.transitions.smooth, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ScaleOnHoverProps {
  children: ReactNode;
  scale?: number;
  className?: string;
}

export function ScaleOnHover({ children, scale = 1.05, className }: ScaleOnHoverProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: scale * 0.95 }}
      transition={animations.transitions.spring}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface FloatingProps {
  children: ReactNode;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export function Floating({ children, duration = 3, yOffset = 10, className }: FloatingProps) {
  return (
    <motion.div
      animate={{
        y: [0, -yOffset, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface PulseProps {
  children: ReactNode;
  scale?: number;
  duration?: number;
  className?: string;
}

export function Pulse({ children, scale = 1.05, duration = 2, className }: PulseProps) {
  return (
    <motion.div
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RotateProps {
  children: ReactNode;
  duration?: number;
  className?: string;
}

export function Rotate({ children, duration = 2, className }: RotateProps) {
  return (
    <motion.div
      animate={{
        rotate: 360,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface DrawSVGProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}

export function DrawSVG({ children, duration = 1, delay = 0, className }: DrawSVGProps) {
  return (
    <motion.div
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        pathLength: { delay, duration, ease: 'easeInOut' },
        opacity: { delay, duration: 0.01 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface TypewriterProps {
  text: string;
  delay?: number;
  className?: string;
}

export function Typewriter({ text, delay = 0, className }: TypewriterProps) {
  const letters = Array.from(text);

  return (
    <motion.span className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.05,
            delay: delay + index * 0.05,
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

export { AnimatePresence, motion };