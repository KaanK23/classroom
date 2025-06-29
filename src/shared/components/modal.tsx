'use client';

import * as React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { cn } from '@/shared/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const modalVariants = cva(
  'fixed z-50 grid w-full gap-4 border bg-background p-6 shadow-lg',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        full: 'max-w-[calc(100vw-2rem)]',
      },
      position: {
        center: 'left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]',
        'top-center': 'left-[50%] top-[10%] translate-x-[-50%]',
        'bottom-center': 'left-[50%] bottom-[10%] translate-x-[-50%]',
      },
    },
    defaultVariants: {
      size: 'md',
      position: 'center',
    },
  }
);

const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const contentVariants = {
  center: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  'top-center': {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  'bottom-center': {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
};

interface ModalProps extends RadixDialog.DialogProps {
  size?: VariantProps<typeof modalVariants>['size'];
  position?: VariantProps<typeof modalVariants>['position'];
  className?: string;
  overlayClassName?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  animate?: boolean;
}

const Modal = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Root>,
  ModalProps
>(({
  children,
  size = 'md',
  position = 'center',
  className,
  overlayClassName,
  showCloseButton = true,
  closeOnOverlayClick = true,
  animate = true,
  ...props
}, _ref) => {
  return (
    <RadixDialog.Root {...props}>
      <AnimatePresence>
        {props.open && (
          <RadixDialog.Portal forceMount>
            <RadixDialog.Overlay asChild>
              <motion.div
                variants={animate ? overlayVariants : undefined}
                initial={animate ? 'initial' : undefined}
                animate={animate ? 'animate' : undefined}
                exit={animate ? 'exit' : undefined}
                transition={{ duration: 0.2 }}
                className={cn(
                  'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm',
                  overlayClassName
                )}
                onClick={closeOnOverlayClick ? () => props.onOpenChange?.(false) : undefined}
              />
            </RadixDialog.Overlay>
            <RadixDialog.Content asChild>
              <motion.div
                variants={animate ? contentVariants[position] : undefined}
                initial={animate ? 'initial' : undefined}
                animate={animate ? 'animate' : undefined}
                exit={animate ? 'exit' : undefined}
                transition={{ 
                  type: 'spring', 
                  stiffness: 300,
                  damping: 20,
                  duration: 0.2 
                }}
                className={cn(
                  modalVariants({ size, position }),
                  'rounded-lg',
                  className
                )}
                onClick={(e) => e.stopPropagation()}
              >
                {showCloseButton && (
                  <RadixDialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </RadixDialog.Close>
                )}
                {children}
              </motion.div>
            </RadixDialog.Content>
          </RadixDialog.Portal>
        )}
      </AnimatePresence>
    </RadixDialog.Root>
  );
});
Modal.displayName = 'Modal';

const ModalTrigger = RadixDialog.Trigger;

const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  />
));
ModalHeader.displayName = 'ModalHeader';

const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
));
ModalFooter.displayName = 'ModalFooter';

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Title>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(({ className, ...props }, ref) => (
  <RadixDialog.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
ModalTitle.displayName = RadixDialog.Title.displayName;

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Description>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(({ className, ...props }, ref) => (
  <RadixDialog.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
ModalDescription.displayName = RadixDialog.Description.displayName;

interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mt-4', className)}
      {...props}
    />
  )
);
ModalContent.displayName = 'ModalContent';

// Compound Modal component for easier usage
interface SimpleModalProps extends Omit<ModalProps, 'children'> {
  title?: string;
  description?: string;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  trigger?: React.ReactNode;
}

export function SimpleModal({
  title,
  description,
  content,
  footer,
  trigger,
  ...modalProps
}: SimpleModalProps) {
  return (
    <Modal {...modalProps}>
      {trigger && <ModalTrigger asChild>{trigger}</ModalTrigger>}
      {(title || description) && (
        <ModalHeader>
          {title && <ModalTitle>{title}</ModalTitle>}
          {description && <ModalDescription>{description}</ModalDescription>}
        </ModalHeader>
      )}
      {content && <ModalContent>{content}</ModalContent>}
      {footer && <ModalFooter>{footer}</ModalFooter>}
    </Modal>
  );
}

export {
  Modal,
  ModalTrigger,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalContent,
};