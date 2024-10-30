import { test, expect } from '@playwright/test';

test('add one product and verify that is added', async ({ page }) => {
  await page.goto('https://magento.softwaretestingboard.com/');
  //await page.getByRole('menuitem', { name: 'Jackets' }).click();
  await page.hover('//span[@class="ui-menu-icon ui-icon ui-icon-carat-1-e"]');
  await page.hover('//li[@class="level1 nav-2-1 category-item first parent ui-menu-item"]');
  await page.locator('//a[@id="ui-id-11"]').click();
  await page.locator('li').filter({ hasText: 'Juno Jacket Rating: 87% 3' }).getByLabel('XS').click();
  await page.locator('li').filter({ hasText: 'Juno Jacket Rating: 87% 3' }).getByLabel('Blue').click();
  await page.locator('li').filter({ hasText: 'Juno Jacket Rating: 87% 3' }).locator('button').click();
  await expect(page.getByRole('link', { name: ' My Cart 1 1 items' })).toBeVisible();
  await page.getByRole('link', { name: ' My Cart 1 1 items' }).click();
  await expect(page.getByRole('button', { name: 'Proceed to Checkout' })).toBeVisible();
});