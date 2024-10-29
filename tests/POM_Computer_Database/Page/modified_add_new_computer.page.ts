import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../POM_Computer_Database/Locators/modified_computer_database.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../POM_Computer_Database/Data/modified_computer_database.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class AddComputerDatabase {
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
    async clickAddNewComputerLink() {
      await this.addNewComputerLink.click();
    }
  
    async fillName(name: string) {
      await this.computerNameLabel.fill(name);
    }
  
    async fillIntroduced(introduced: string) {
      await this.introducedLabel.fill(introduced);
    }
  
    async fillDiscontinued(discontinued: string) {
      await this.discontinuedLabel.fill(discontinued);
    }
  
    async selectCompany(company: string) {
      await this.companySelect.click();
      await this.companySelect.selectOption(company);
    }
  
    async submit() {
      await this.createButton.click();
    }
  
    async checkSuccessMessage(name: string) {
      await expect(this.successMessage).toContainText(`Computer ${name} has been created`);
    }
  }
  
  