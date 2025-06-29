import { Variants, Transition } from 'framer-motion';

// Animation Presets
export const transitions = {
  spring: {
    type: 'spring',
    stiffness: 200,
    damping: 20,
  } as Transition,
  smooth: {
    type: 'tween',
    duration: 0.3,
    ease: 'easeInOut',
  } as Transition,
  bounce: {
    type: 'spring',
    stiffness: 400,
    damping: 10,
  } as Transition,
  slow: {
    type: 'tween',
    duration: 0.6,
    ease: 'easeInOut',
  } as Transition,
  fast: {
    type: 'tween',
    duration: 0.15,
    ease: 'easeOut',
  } as Transition,
};

// Fade Variants
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

// Scale Variants
export const scaleIn: Variants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 },
};

export const scaleInCenter: Variants = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0, opacity: 0 },
};

export const scaleBounce: Variants = {
  initial: { scale: 0 },
  animate: { 
    scale: 1,
    transition: { type: 'spring', stiffness: 500, damping: 15 }
  },
  exit: { scale: 0 },
};

// Slide Variants
export const slideInFromLeft: Variants = {
  initial: { x: '-100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 },
};

export const slideInFromRight: Variants = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '100%', opacity: 0 },
};

export const slideInFromTop: Variants = {
  initial: { y: '-100%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: '-100%', opacity: 0 },
};

export const slideInFromBottom: Variants = {
  initial: { y: '100%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: '100%', opacity: 0 },
};

// Stagger Children
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

// Rotate Variants
export const rotateIn: Variants = {
  initial: { rotate: -180, opacity: 0 },
  animate: { rotate: 0, opacity: 1 },
  exit: { rotate: 180, opacity: 0 },
};

export const flipIn: Variants = {
  initial: { rotateY: -90, opacity: 0 },
  animate: { rotateY: 0, opacity: 1 },
  exit: { rotateY: 90, opacity: 0 },
};

// Page Transitions
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3, ease: 'easeIn' }
  },
};

// Hover Effects
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

export const hoverLift = {
  whileHover: { y: -5 },
  whileTap: { y: 0 },
};

export const hoverGlow = {
  whileHover: { 
    boxShadow: '0 0 25px rgba(59, 130, 246, 0.5)',
    transition: { duration: 0.3 }
  },
};

// Complex Animations
export const cardHover: Variants = {
  initial: {
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
  },
  whileHover: {
    y: -5,
    boxShadow: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
    transition: { duration: 0.3 }
  },
};

export const listItemHover: Variants = {
  initial: { backgroundColor: 'transparent' },
  whileHover: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    x: 5,
    transition: { duration: 0.2 }
  },
};

// Utility Functions
export const createCustomVariant = (
  initial: Record<string, unknown>,
  animate: Record<string, unknown>,
  exit?: Record<string, unknown>
): Variants => ({
  initial,
  animate,
  exit: exit || initial,
});

export const combineVariants = (...variants: Variants[]): Variants => {
  return variants.reduce((acc, variant) => ({
    initial: { ...acc.initial, ...variant.initial },
    animate: { ...acc.animate, ...variant.animate },
    exit: { ...acc.exit, ...variant.exit },
  }), { initial: {}, animate: {}, exit: {} });
};

// Gesture Animations
export const dragConstraints = {
  elastic: { top: 0, left: 0, right: 0, bottom: 0 },
  bounce: { 
    top: -50, 
    left: -50, 
    right: 50, 
    bottom: 50,
    damping: 0.5,
    stiffness: 300,
  },
};

// Loading Animations
export const shimmer: Variants = {
  initial: { backgroundPosition: '-200% 0' },
  animate: {
    backgroundPosition: '200% 0',
    transition: {
      duration: 1.5,
      ease: 'linear',
      repeat: Infinity,
    },
  },
};

export const pulse: Variants = {
  initial: { opacity: 0.6 },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};

// Notification Animations
export const notification: Variants = {
  initial: { 
    opacity: 0, 
    y: 50, 
    scale: 0.3 
  },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.175, 0.885, 0.32, 1.275],
    }
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: { duration: 0.2, ease: 'easeIn' }
  },
};

// Micro Interactions
export const buttonTap = {
  whileTap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  },
};

export const iconSpin = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Reveal Animations
export const revealFromBottom: Variants = {
  initial: { 
    clipPath: 'inset(100% 0% 0% 0%)',
    opacity: 0 
  },
  animate: { 
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
};

export const revealFromLeft: Variants = {
  initial: { 
    clipPath: 'inset(0% 100% 0% 0%)',
    opacity: 0 
  },
  animate: { 
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
};