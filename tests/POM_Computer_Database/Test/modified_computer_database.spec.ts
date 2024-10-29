import { test, expect } from '@playwright/test';
import { ModifiedComputerDatabase } from '../../POM_Computer_Database/Page/modified_computer_database.page';
import {AddComputerDatabase} from '../../POM_Computer_Database/Page/modified_add_new_computer.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../POM_Computer_Database/Data/modified_computer_database.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test.beforeEach('go to the page', async ({ page }) => {
    const comDatabase = new ModifiedComputerDatabase(page);
     await comDatabase.navigate();
  });

test('verify page title', async ({ page }) => {
  const comDatabase = new ModifiedComputerDatabase(page);
  await comDatabase.verifyPageTitle();
});

test('test for verifying the number of search records is correct', async ({ page }) => {
  const comDatabase = new ModifiedComputerDatabase(page);
  await comDatabase.verifySearchRecords();
});

test('test for adding new computer', async ({ page }) => {
     const addComputer = new AddComputerDatabase(page); 
     const computer = data.computerData[0];
      //await addComputer.navigate();
      await addComputer.clickAddNewComputerLink(); 
      await addComputer.fillName(computer.name); 
      await addComputer.fillIntroduced(computer.introduced); 
      await addComputer.fillDiscontinued(computer.discontinued); 
      await addComputer.selectCompany(computer.company); 
      await addComputer.submit(); 
      await addComputer.checkSuccessMessage(computer.name); 
    });

    for (const computer of data.computerData) {
        test(`test for data driven adding computers ${computer.name}`, async ({ page }) => {
          const addComputer = new AddComputerDatabase(page);
          await addComputer.clickAddNewComputerLink(); 
          await addComputer.fillName(computer.name); 
          await addComputer.fillIntroduced(computer.introduced); 
          await addComputer.fillDiscontinued(computer.discontinued); 
          await addComputer.selectCompany(computer.company); 
          await addComputer.submit(); 
          await addComputer.checkSuccessMessage(computer.name); 
        });
      }