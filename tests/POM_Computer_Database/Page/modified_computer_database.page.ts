import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../POM_Computer_Database/Locators/modified_computer_database.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../POM_Computer_Database/Data/modified_computer_database.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class ModifiedComputerDatabase {
  readonly page: Page;
  readonly homepageUrl: string;
  readonly pageTitleLink: Locator;
  readonly addNewComputerLink: Locator;
  readonly computerNameLabel: Locator;
  readonly introducedLabel: Locator;
  readonly discontinuedLabel: Locator;
  readonly companySelect: Locator;
  readonly createButton: Locator;
  readonly successMessage: Locator;
  readonly searchPlaceholder: Locator;
  readonly filterButton: Locator;
  readonly labelText: Locator;
  readonly rowCount: Locator;

  readonly expectedPageTitleText: string;
  readonly expectedSuccessMessage: string;
  readonly expectedSearchResultText: string;

  constructor(page: Page) {
    this.page = page;
    this.homepageUrl = data.homepageUrl;

    this.pageTitleLink = page.locator(locators.computerDatabase.pageTitleLink);
    this.addNewComputerLink = page.locator(locators.computerDatabase.addNewComputerLink);
    this.computerNameLabel = page.locator(locators.computerDatabase.computerNameLabel);
    this.introducedLabel = page.locator(locators.computerDatabase.introducedLabel);
    this.discontinuedLabel = page.locator(locators.computerDatabase.discontinuedLabel);
    this.companySelect = page.locator(locators.computerDatabase.companySelect);
    this.createButton = page.locator(locators.computerDatabase.createButton);
    this.successMessage = page.locator(locators.computerDatabase.successMessage);
    this.searchPlaceholder = page.locator(locators.computerDatabase.searchPlaceholder);
    this.filterButton = page.locator(locators.computerDatabase.filterButton);
    this.labelText = page.locator(locators.computerDatabase.labelText);
    this.rowCount = page.locator(locators.computerDatabase.rowCount);

    this.expectedPageTitleText = data.expectedMessages.pageTitleText;
    this.expectedSuccessMessage = data.expectedMessages.successMessage;
    this.expectedSearchResultText = data.expectedMessages.searchResultText;
  }

  async navigate() {
    await this.page.goto('/');
  }

  async verifyPageTitle() {
    await expect(this.pageTitleLink).toHaveText('Computer database');
  }

  async verifySearchRecords() {
    await this.searchPlaceholder.click();
    await this.searchPlaceholder.fill('ACE');
    await this.filterButton.click();
    const labelText = await this.labelText.textContent();
    const rowCount = await this.rowCount.count();
    expect(labelText).toContain(`${rowCount} computers found`);
    expect(rowCount).toBe(6);
  }
  
}