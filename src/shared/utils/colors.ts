// Utility to convert HSL CSS variables to Tailwind classes
export function hsl(variable: string) {
  return `hsl(var(${variable}))`;
}