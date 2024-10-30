import { test, expect } from '@playwright/test';
import randomstring from 'randomstring';

test('Register new user and verify that is created', async ({ page }) => {
  // Navigate to the registration page
  await page.goto('https://magento.softwaretestingboard.com/');

  // Generate a random email address
  const randomEmail = `user_${randomstring.generate(7)}@example.com`;

  // Fill out the registration form
  await page.locator('(//a[@href="https://magento.softwaretestingboard.com/customer/account/create/"])[1]').click();
  await page.locator('//input[@id="firstname"]').fill('Test');
  await page.locator('//input[@id="lastname"]').fill('User');
  await page.locator('//input[@id="email_address"]').fill(randomEmail);
  await page.locator('(//input[@name="password"])[1]').fill('Natasha!@#4');
  await page.locator('//input[@name="password_confirmation"]').fill('Natasha!@#4');

  // Submit the form
  await page.locator('//button[@class="action submit primary"]').click();

  // Verify registration success
  await expect(page).toHaveURL('https://magento.softwaretestingboard.com/customer/account/');
  await expect(page.locator('(//span[@class="logged-in"])[1]')).toContainText('Welcome, Test User!');
  await expect(page.locator('//span[@class="base"]')).toContainText('My Account');

});
