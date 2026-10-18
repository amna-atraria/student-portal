import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // await page.goto('http://localhost:5173/');
  await page.goto('http://localhost:5173/signup');
  await page.getByRole('textbox', { name: 'Full Name' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).fill('kIRAN');
  await page.getByRole('textbox', { name: 'Full Name' }).press('Tab');
  await page.getByRole('textbox', { name: 'Email Address' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Email Address' }).fill('kiran@gmail.com');
  await page.getByRole('textbox', { name: 'Email Address' }).press('Tab');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Create Account' }).press('Enter');
  await page.getByRole('button', { name: 'Update' }).nth(1).click();
  await page.getByRole('textbox', { name: 'Full name *' }).click();
  await page.getByRole('textbox', { name: 'Full name *' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'Full name *' }).fill('kishvar');
  await page.getByRole('textbox', { name: 'Full name *' }).press('Tab');
  await page.getByRole('textbox', { name: 'Email address *' }).fill('kishvar@gmail.com');
  await page.getByRole('textbox', { name: 'Email address *' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Email address *' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Email address *' }).press('Tab');
  await page.getByRole('link', { name: 'Cancel' }).press('Tab');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Save changes' }).press('Enter');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Delete' }).nth(4).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Delete' }).first().click();
});