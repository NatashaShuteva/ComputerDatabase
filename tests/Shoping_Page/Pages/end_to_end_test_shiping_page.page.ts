// page.ts
import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Shoping_Page/fixtures/Locators/end_to_end_shiping.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Shoping_Page/fixtures/Data/end_to_end_shiping.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class ShippingPage {
  readonly page: Page;
  

  constructor(page: Page) {
    this.page = page;

   }


   async addEmail() {
    //await this.page.waitForTimeout(5000);
    //await this.page.locator(locators.addEmailloc).click();
    //await this.page.locator(locators.addEmailloc).fill(data.addEmailData);
    await this.page.getByRole('textbox', { name: 'Email Address * Email Address' }).click();
    await this.page.getByRole('textbox', { name: 'Email Address * Email Address' }).fill('test@test.com');
  }

  async addFisrtName() {
    await this.page.locator(locators.addFirstNameloc).fill(data.addFisrtNameData);
  }

  async addLastName() {
    await this.page.locator(locators.addLastNameloc).fill(data.AddLastNameData);
  }

  async addAdress() {
    await this.page.locator(locators.addAdressloc).fill(data.AddAdressData);
  }
  async addCity() {
    await this.page.locator(locators.addCityloc).fill(data.addCityData);
  }

  async addZipCode() {
    await this.page.locator(locators.addZipCodeloc).fill(data.addZipCodeData);
  }

  async selectContry(){
    await this.page.locator(locators.selectCountryloc).selectOption(data.addCountryData);
  }

  async addPhoneNumber() {
    await this.page.locator(locators.addPhoneNumloc).fill(data.addPhoneNumData);
  }

  async clickOnTheNextButton() {
    // Navigate to the page and wait until the load event is fired 
    await this.page.goto('https://magento.softwaretestingboard.com/checkout/#shipping', { waitUntil: 'load' });
     // Replace with your actual URL 
     // Optionally, you can perform additional actions or assertions after the page is fully loaded 
     const content = await this.page.content(); 
     console.log(content); 
     // Example assertion to check if a specific element is present 
     const exampleElement = this.page.locator('button[data-role="opc-continue"][type="submit"].button.action.continue.primary'); 
     // Replace with your actual element selector 
     await expect(exampleElement).toBeVisible();
    //await this.page.locator(locators.clickNextButtonloc).click(); 
    await this.page.getByRole('button', { name: 'Next' }).click();

    await this.page.reload();
    const exampleElement2 = this.page.locator('button[data-role="opc-continue"][type="submit"].button.action.continue.primary'); 
    // Replace with your actual element selector 
    await expect(exampleElement2).toBeVisible();
    await this.page.getByRole('button', { name: 'Next' }).click();
   // await page.getByRole('button', { name: 'Place Order' }).click();
   // await expect(page.getByText('Thank you for your purchase!')).toBeVisible();
   //wiat radio button to be displyed
  }

  async clickOnThePlaceOrderButton(){
    await this.page.locator(locators.placeorderloc).click();
  }

  async successPurchase(){
    const content = await this.page.content(); 
     console.log(content); 
     // Example assertion to check if a specific element is present 
     const exampleElement = this.page.locator((locators.successpurchaseloc)); 
     // Replace with your actual element selector 
     await expect(exampleElement).toBeVisible();
    await expect(this.page.locator(locators.successpurchaseloc)).toContainText('Thank you for your purchase!');
  }

}  