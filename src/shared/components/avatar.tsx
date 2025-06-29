'use client';

import * as React from 'react';
import * as RadixAvatar from '@radix-ui/react-avatar';
import { cn } from '@/shared/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';

const avatarVariants = cva(
  'relative inline-flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        xs: 'h-6 w-6',
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
        '2xl': 'h-20 w-20',
        '3xl': 'h-24 w-24',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const statusVariants = cva(
  'absolute rounded-full border-2 border-background',
  {
    variants: {
      size: {
        xs: 'h-2 w-2',
        sm: 'h-2.5 w-2.5',
        md: 'h-3 w-3',
        lg: 'h-3.5 w-3.5',
        xl: 'h-4 w-4',
        '2xl': 'h-5 w-5',
        '3xl': 'h-6 w-6',
      },
      position: {
        'bottom-right': 'bottom-0 right-0',
        'bottom-left': 'bottom-0 left-0',
        'top-right': 'top-0 right-0',
        'top-left': 'top-0 left-0',
      },
      status: {
        online: 'bg-success',
        offline: 'bg-muted',
        busy: 'bg-destructive',
        away: 'bg-warning',
      },
    },
    defaultVariants: {
      size: 'md',
      position: 'bottom-right',
      status: 'offline',
    },
  }
);

interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof RadixAvatar.Root>,
    VariantProps<typeof avatarVariants> {
  status?: 'online' | 'offline' | 'busy' | 'away';
  statusPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  showStatus?: boolean;
  animate?: boolean;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof RadixAvatar.Root>,
  AvatarProps
>(({ 
  className, 
  size, 
  status = 'offline', 
  statusPosition = 'bottom-right',
  showStatus = false,
  animate = false,
  ...props 
}, ref) => {
  const Component = animate ? motion.div : 'div';
  
  return (
    <Component
      whileHover={animate ? { scale: 1.05 } : undefined}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <RadixAvatar.Root
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        {...props}
      >
        {props.children}
        {showStatus && (
          <motion.span
            initial={animate ? { scale: 0 } : undefined}
            animate={animate ? { scale: 1 } : undefined}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            className={cn(statusVariants({ size, position: statusPosition, status }))}
          >
            {status === 'online' && animate && (
              <motion.span
                className="absolute inset-0 rounded-full bg-success"
                animate={{
                  scale: [1, 1.5, 1.5],
                  opacity: [1, 0, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            )}
          </motion.span>
        )}
      </RadixAvatar.Root>
    </Component>
  );
});
Avatar.displayName = RadixAvatar.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof RadixAvatar.Image>,
  React.ComponentPropsWithoutRef<typeof RadixAvatar.Image>
>(({ className, ...props }, ref) => (
  <RadixAvatar.Image
    ref={ref}
    className={cn('aspect-square h-full w-full object-cover', className)}
    {...props}
  />
));
AvatarImage.displayName = RadixAvatar.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof RadixAvatar.Fallback>,
  React.ComponentPropsWithoutRef<typeof RadixAvatar.Fallback>
>(({ className, ...props }, ref) => (
  <RadixAvatar.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground',
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = RadixAvatar.Fallback.displayName;

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
  size?: VariantProps<typeof avatarVariants>['size'];
  spacing?: 'tight' | 'normal' | 'loose';
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, max = 4, size = 'md', spacing = 'normal', className, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const visibleChildren = childrenArray.slice(0, max);
    const remainingCount = childrenArray.length - max;

    const spacingClasses = {
      tight: '-space-x-2',
      normal: '-space-x-3',
      loose: '-space-x-4',
    };

    return (
      <div
        ref={ref}
        className={cn('flex items-center', spacingClasses[spacing], className)}
        {...props}
      >
        {visibleChildren.map((child, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative transition-transform hover:z-10 hover:scale-110"
            style={{ zIndex: childrenArray.length - index }}
          >
            {child}
          </motion.div>
        ))}
        {remainingCount > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: visibleChildren.length * 0.1 }}
            className="relative transition-transform hover:z-10 hover:scale-110"
          >
            <Avatar size={size}>
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
                +{remainingCount}
              </AvatarFallback>
            </Avatar>
          </motion.div>
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = 'AvatarGroup';

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup };