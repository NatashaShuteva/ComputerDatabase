// test.spec.ts
import { test, expect } from '@playwright/test';
import { ProductPage } from '../Pages/end_to_end_test_add_product_to_card.page';
import { ShippingPage } from '../Pages/end_to_end_test_shiping_page.page';

import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Shoping_Page/fixtures/Data/add_product.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test.beforeEach('navvigate to page', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.navigate();
});

test('add one product and verify that is added', async ({ page }) => {
  const productPage = new ProductPage(page);
  const shipingPage = new ShippingPage(page);
  await productPage.hoverMenuIcon();
  await productPage.hoverCategoryItem();
  await productPage.clickCategoryLink();
  await productPage.selectSize(data.size);
  await productPage.selectColor(data.color);
  await productPage.addToCart();
  await productPage.clickMyCartLink();
  await productPage.verifyProductInCart();
  await productPage.clickProeceedCheckout();
  await shipingPage.addEmail();
  await shipingPage.addFisrtName();
  await shipingPage.addLastName();
  await shipingPage.addAdress();
  await shipingPage.addCity();
  await shipingPage.addZipCode();
  await shipingPage.selectContry();
  await shipingPage.addPhoneNumber();
  await shipingPage.clickOnTheNextButton();
  await shipingPage.clickOnThePlaceOrderButton();
  await shipingPage.successPurchase();
});