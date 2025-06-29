import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should redirect to signin when accessing protected route', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/.*auth\/signin/);
  });

  test('should show signin page', async ({ page }) => {
    await page.goto('/auth/signin');
    await expect(page).toHaveTitle(/Sign In/);
  });

  test('should show signup page', async ({ page }) => {
    await page.goto('/auth/signup');
    await expect(page).toHaveTitle(/Sign Up/);
  });

  test('should redirect to dashboard after successful signin', async ({ page }) => {
    await page.goto('/auth/signin');
    
    // Fill in credentials
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
  });
});