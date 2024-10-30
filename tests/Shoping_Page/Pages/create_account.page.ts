
import { Page, Locator, expect } from '@playwright/test';
import randomstring from 'randomstring';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Shoping_Page/fixtures/Locators/create_account.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Shoping_Page/fixtures/Data/create_account.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class RegisterPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://magento.softwaretestingboard.com/');
  }

  async clickCreateAccountLink() {
    await this.page.locator(locators.createAccountLink).click();
  }

  async fillFirstName() {
    await this.page.locator(locators.firstNameInput).fill(data.firstName);
  }

  async fillLastName() {
    await this.page.locator(locators.lastNameInput).fill(data.lastName);
  }

  async fillEmail() {
    const randomEmail = `user_${randomstring.generate(7)}${data.emailDomain}`;
    await this.page.locator(locators.emailInput).fill(randomEmail);
  }

  async fillPassword() {
    await this.page.locator(locators.passwordInput).fill(data.password);
  }

  async fillPasswordConfirmation() {
    await this.page.locator(locators.passwordConfirmInput).fill(data.password);
  }

  async submitForm() {
    await this.page.locator(locators.submitButton).click();
  }

  async verifyRegistrationSuccess() {
    await expect(this.page).toHaveURL('https://magento.softwaretestingboard.com/customer/account/');
    await expect(this.page.locator(locators.loggedInMessage)).toContainText('Welcome, Test User!');
    await expect(this.page.locator(locators.accountBaseMessage)).toContainText('My Account');
  }
}
