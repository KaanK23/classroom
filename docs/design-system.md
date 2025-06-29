# Classroom Design System

A modern, accessible design system for the Classroom learning platform.

## Core Principles

- **Modern & Clean**: Professional aesthetic that surpasses competitors
- **Accessibility First**: WCAG AAA compliant color contrasts
- **Dark Mode Native**: First-class dark theme support
- **Performance Focused**: Optimized animations and lightweight components
- **Mobile First**: Responsive design that works on all devices

## Color Palette

### Semantic Colors

- **Primary**: Blue (HSL 221, 83%, 53%) - Main brand color
- **Secondary**: Neutral gray - Secondary actions
- **Accent**: Light gray - Highlights and accents
- **Success**: Green - Positive feedback
- **Warning**: Amber - Caution states
- **Destructive**: Red - Dangerous actions

### Theme Support

The design system supports both light and dark themes with automatic system preference detection.

```tsx
// Toggle theme programmatically
import { useTheme } from '@/contexts/infrastructure/ui/theme-provider';

const { theme, setTheme } = useTheme();
setTheme('dark'); // 'light', 'dark', or 'system'
```

## Typography

### Font Stack

- **Primary**: Inter (variable font)
- **Fallback**: Geist Sans, system fonts
- **Monospace**: Geist Mono

### Type Scale

```css
h1: 3rem / 4rem (mobile/desktop)
h2: 2.25rem
h3: 1.5rem
h4: 1.25rem
body: 1rem
small: 0.875rem
```

## Components

### Button

```tsx
import { Button } from '@/shared/components/button';

// Variants
<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/shared/components/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
  <CardFooter>
    Footer
  </CardFooter>
</Card>
```

## Utility Classes

### Animations

- `.animate-slide-up` - Slide up animation
- `.animate-slide-down` - Slide down animation
- `.animate-fade-in` - Fade in animation
- `.animate-scale-in` - Scale in animation

### Effects

- `.hover-lift` - Lift on hover effect
- `.glass` - Glassmorphism effect
- `.gradient-text` - Gradient text effect

### Layout

- `.container` - Responsive container with max-width
- `.grid-cols-auto-fit` - Auto-fit grid layout

## Spacing System

Based on 8px grid:

- `xs`: 4px (0.25rem)
- `sm`: 8px (0.5rem)
- `md`: 16px (1rem)
- `lg`: 24px (1.5rem)
- `xl`: 32px (2rem)
- `2xl`: 48px (3rem)
- `3xl`: 64px (4rem)

## Best Practices

### Accessibility

1. Always use semantic HTML
2. Provide proper ARIA labels
3. Ensure keyboard navigation works
4. Test with screen readers
5. Maintain color contrast ratios

### Performance

1. Use CSS animations over JavaScript
2. Leverage GPU acceleration with transforms
3. Lazy load heavy components
4. Optimize images with Next.js Image

### Consistency

1. Use design tokens via CSS variables
2. Follow the component API patterns
3. Maintain spacing rhythm
4. Keep animations subtle and purposeful

## Live Demo

Visit `/design-system` in your development environment to see all components in action.

## Customization

### Extending the Theme

Add custom CSS variables to `globals.css`:

```css
:root {
  --custom-color: 120 100% 50%;
}

.dark {
  --custom-color: 120 100% 40%;
}
```

### Creating New Components

1. Use the `cn()` utility for class merging
2. Support dark mode via CSS variables
3. Add proper TypeScript types
4. Include accessibility features
5. Document usage examples

## Resources

- [View Design System](/design-system)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Inter Font](https://fonts.google.com/specimen/Inter)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)