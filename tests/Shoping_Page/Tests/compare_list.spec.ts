// test.spec.ts
import { test, expect } from '@playwright/test';
import { ProductPage } from '../../Shoping_Page/Pages/compare_list.page';

import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Shoping_Page/fixtures/Data/compare_list.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test.beforeEach('navvigate to page', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.navigate();
});

test('compare list', async ({ page }) => {
  const productPage = new ProductPage(page);
  await productPage.hoverMenuIcon();
  await productPage.hoverCategoryItem();
  await productPage.clickCategoryLink();
  await productPage.clickOnTheFisrtCard();
  await productPage.clickAddToCompare();
  await productPage.hoverMenuIcon();
  await productPage.hoverCategoryItem2();  
  await productPage.clickCategoryLink();
  await productPage.clickOnTheSecondCard();
  await productPage.clickAddToCompare();
  await productPage.clickCompareLink();
  const itemCount = await productPage.countItemsInTable(); 
  expect(itemCount).toBe(2);
});