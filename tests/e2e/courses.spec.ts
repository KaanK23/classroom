import { test, expect } from '@playwright/test';

test.describe('Courses', () => {
  test('should display public courses list', async ({ page }) => {
    await page.goto('/courses');
    
    // Check if courses are displayed
    await expect(page.locator('h1')).toContainText('Courses');
    
    // Check for course cards
    const courseCards = page.locator('[data-testid="course-card"]');
    await expect(courseCards).toHaveCount(0); // No courses initially
  });

  test('should show course details', async ({ page }) => {
    // This test assumes a course with ID exists
    await page.goto('/courses/test-course-id');
    
    // Check course details page elements
    await expect(page.locator('[data-testid="course-title"]')).toBeVisible();
    await expect(page.locator('[data-testid="course-description"]')).toBeVisible();
    await expect(page.locator('[data-testid="enroll-button"]')).toBeVisible();
  });

  test('should require authentication to enroll', async ({ page }) => {
    await page.goto('/courses/test-course-id');
    
    // Click enroll button
    await page.click('[data-testid="enroll-button"]');
    
    // Should redirect to signin
    await expect(page).toHaveURL(/.*auth\/signin/);
  });
});