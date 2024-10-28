import { test, expect } from '@playwright/test';
import { DemoQAPage } from '../../POM_Computer_Database/Page/computer_database.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../POM_Computer_Database/Data/computer_database.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('verify page title', async ({ page }) => {
  const demoQAPage = new DemoQAPage(page);

  await demoQAPage.navigate();
  await demoQAPage.verifyPageTitle();
});

test('test for adding new computer', async ({ page }) => {
  const demoQAPage = new DemoQAPage(page);
  const computer = data.computerData[0];

  await demoQAPage.navigate();
  await demoQAPage.addNewComputer(computer.name, computer.introduced, computer.discontinued, computer.company);
});

test('test for verifying the number of search records is correct', async ({ page }) => {
  const demoQAPage = new DemoQAPage(page);

  await demoQAPage.navigate();
  await demoQAPage.verifySearchRecords();
});



for (const computer of data.computerData) {
  test(`test for data driven adding computers ${computer.name}`, async ({ page }) => {
    const demoQAPage = new DemoQAPage(page);

    await demoQAPage.navigate();
    await demoQAPage.addNewComputer(computer.name, computer.introduced, computer.discontinued, computer.company);
  });
}
