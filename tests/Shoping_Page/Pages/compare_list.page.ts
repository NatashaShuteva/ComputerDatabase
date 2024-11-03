
import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Shoping_Page/fixtures/Locators/compare_list.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Shoping_Page/fixtures/Data/compare_list.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class ProductPage {
  readonly page: Page;
  

  constructor(page: Page) {
    this.page = page;

  }

  async navigate() {
    await this.page.goto('https://magento.softwaretestingboard.com/');
  }

  async hoverMenuIcon() {
    await this.page.hover(locators.uiMenuIcon);
  }

  async hoverCategoryItem() {
    //await this.page.waitForTimeout(5000);
    await this.page.hover(locators.categoryItem);
  }

  async clickCategoryLink() {
    await this.page.locator(locators.categoryLink).click();
  }
  async clickOnTheFisrtCard() {
    await this.page.locator(locators.clcikonthefisrtcard).click();
  }

  async clickAddToCompare() {
    await this.page.waitForTimeout(5000);
    await this.page.locator(locators.clicaddtocompare).click();
  }

  async hoverCategoryItem2() {
    //await this.page.waitForTimeout(5000);
    await this.page.hover(locators.categoryItem);
  }

  async clickOnTheSecondCard() {
    await this.page.locator(locators.clcikonthesecondcard).click();
  }
  async clickCompareLink() {
    await this.page.waitForTimeout(5000);
    await this.page.locator(locators.clickonthecomparelink).click();
  }
  
  async countItemsInTable() {
    await this.page.waitForTimeout(5000);
     const rows = await this.page.locator(locators.tablegrid); 
     return await rows.count(); 
    }

}

