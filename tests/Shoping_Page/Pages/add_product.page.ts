// page.ts
import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Shoping_Page/fixtures/Locators/add_product.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Shoping_Page/fixtures/Data/add_product.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class ProductPage {
  readonly page: Page;
  

  constructor(page: Page) {
    this.page = page;

    this.page.on('dialog', async dialog => {
       console.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept(); });
        
  }

  async navigate() {
    await this.page.goto('https://magento.softwaretestingboard.com/');
  }

  async hoverMenuIcon() {
    await this.page.hover(locators.uiMenuIcon);
  }

  async hoverCategoryItem() {
    await this.page.hover(locators.categoryItem);
  }

  async clickCategoryLink() {
    await this.page.locator(locators.categoryLink).click();
  }

  async selectSize(size: string) {
    await this.page.locator(locators.sizeSelector).click();
  }

  async selectColor(color: string) {
    await this.page.locator(locators.colorSelector).click();
  }

  async addToCart() {
    await this.page.locator(locators.addToCartButton).click();
  }

  
  async clickMyCartLink() {
    await this.page.evaluate(() => { window.scrollTo(0, 0); });
    await this.page.locator(locators.myCartLink).click();
  }

  async verifyProductInCart() {
    await expect(this.page.locator(locators.proceedToCheckout)).toContainText('Proceed to Checkout');
  }

  async clickOnTheShopBin(){
    await this.page.locator(locators.clickOnTheShopingBin).click();
  }

  async clickConfirmButton() {
     await this.page.locator(locators.confirmButton).click();
     }

     async verifyProductInDeleted() {
      await expect(this.page.locator(locators.verifyPopupMessage)).toContainText('You have no items in your shopping cart.');
    }

}
