import { test, expect } from '@playwright/test';

test('verify page title', async ({ page }) => {
  await page.goto('https://computer-database.gatling.io/computers');
  await expect(page.getByRole('link', { name: 'Computer database' })).toHaveText('Computer database');
});


test('test for adding new computer', async ({ page }) => {
  await page.goto('https://computer-database.gatling.io/computers');
  await page.getByRole('link', { name: 'Add a new computer' }).click();
  await page.getByLabel('Computer name').click();
  await page.getByLabel('Computer name').fill('Natasha');
  await page.getByLabel('Introduced').click();
  await page.getByLabel('Introduced').fill('1990-02-14');
  await page.getByLabel('Discontinued').click();
  await page.getByLabel('Discontinued').fill('2024-10-25');
  await page.getByLabel('Company').selectOption('5');
  await page.getByRole('button', { name: 'Create this computer' }).click();
  await expect(page.getByText('Done ! Computer Natasha has')).toContainText('Done ! Computer Natasha has');
});


test('test for varifiing that the nubers of serch records is correct', async ({ page }) => {
  await page.goto('https://computer-database.gatling.io/computers');
  await page.getByPlaceholder('Filter by computer name...').click();
  await page.getByPlaceholder('Filter by computer name...').fill('ACE');
  await page.getByRole('button', { name: 'Filter by name' }).click();

  // Locator for the label text
  const labelText = await page.locator('h1:has-text("computers found")').textContent();


  // Locator for the computer rows in the table
  const rowCount = await page.locator('table tbody tr').count();
  expect(labelText).toContain(`${rowCount} computers found`);
  expect(rowCount).toBe(6);
});

import * as fs from 'fs';
import * as path from 'path';

// Load the data from JSON file
const dataPath = path.resolve(__dirname, 'computers.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const computers = JSON.parse(rawData);


  
  for (const computer of computers) {

    test(`test for data driven adding computers ${computer.name}`, async ({ page }) => {
    await page.goto('https://computer-database.gatling.io/computers');

    await page.getByRole('link', { name: 'Add a new computer' }).click();
    await page.getByLabel('Computer name').click();
    await page.getByLabel('Computer name').fill(computer.name);
    await page.getByLabel('Introduced').click();
    await page.getByLabel('Introduced').fill(computer.introduced);
    await page.getByLabel('Discontinued').click();
    await page.getByLabel('Discontinued').fill(computer.discontinued);
    await page.getByLabel('Company').selectOption(computer.company);
    await page.getByRole('button', { name: 'Create this computer' }).click();
   // await expect(page.getByText(`Done ! Computer ${computer.name} has`)).toContainText('Done !  Computer `${computer.name}` has been created');
   // await expect(page.getByText('Done ! Computer ')).toContainText(`Computer ${computer.name} has been created`);
    await expect(page.locator('div.alert-message.warning')).toContainText(`Computer ${computer.name} has been created`);
    await expect(page.locator('div.alert-message.warning')).toContainText('Computer '+ computer.name +' has been created');

});

}  