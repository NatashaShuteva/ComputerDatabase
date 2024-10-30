import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../Shoping_Page/Pages/create_account.page';

test.beforeEach('Open login page', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate();
});

test('Register new user and verify that is created', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.clickCreateAccountLink();
  await registerPage.fillFirstName();
  await registerPage.fillLastName();
  await registerPage.fillEmail();
  await registerPage.fillPassword();
  await registerPage.fillPasswordConfirmation();
  await registerPage.submitForm();
  await registerPage.verifyRegistrationSuccess();
});
