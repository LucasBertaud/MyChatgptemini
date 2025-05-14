import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page
    .getByRole('textbox', { name: 'Email address' })
    .fill('boyam11294@daupload.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Azerty123**');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('textbox', { name: 'Message ChatGPTemini...' }).click();
  await page
    .getByRole('textbox', { name: 'Message ChatGPTemini...' })
    .fill("test d'un message");
  await page.getByRole('button', { name: 'Send' }).click();
  await page.getByRole('link', { name: 'Test de message' }).last().click();
  await expect(
    page.getByText("test d'un message", { exact: true })
  ).toBeVisible();
  await page.getByRole('textbox', { name: 'Message ChatGPTemini...' }).click();
  await page
    .getByRole('textbox', { name: 'Message ChatGPTemini...' })
    .fill('ça va bien ?');
  await page.getByRole('button', { name: 'Send' }).click();
});
