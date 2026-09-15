import { expect, test } from '@playwright/test'

test('page loads without uncaught errors', async ({ page }) => {
  const pageErrors: Error[] = []
  page.on('pageerror', err => pageErrors.push(err))
  await page.goto('/')
  expect(pageErrors).toHaveLength(0)
})

test('page title is correct', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('Logo Tester')
})

test('root element mounts and renders content', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#root')).toBeAttached()
  await expect(page.locator('#root')).not.toBeEmpty()
})

test('rating a criteria enables the copy button', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByTestId('button-copy')).toBeDisabled()
  await page.getByTestId('button-yes-clearly').first().click()
  await expect(page.getByTestId('button-copy')).toBeEnabled()
})
