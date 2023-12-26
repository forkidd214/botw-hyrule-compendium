import { test, expect } from '@playwright/test'

test('should navigate properly', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/')
  // Find an heading with the text 'Compendium' and click on it
  await page.getByRole('link', { name: /compendium/i }).click()
  // The new URL should be "/compendium" (baseURL is used there)
  await expect(page).toHaveURL(/.*compendium/)
  // The new page should contain an h1 with "Compendium"
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    /compendium/i
  )
  await page.getByRole('link', { name: /back/i }).click()
  await expect(page).toHaveURL('/')
})

test('should support typical browser actions', async ({ page }) => {
  await page.goto('/compendium')

  // switch tabs
  await expect(page.getByLabel('Giant Horse')).toBeVisible()
  await page.getByRole('tab', { name: 'monsters' }).click()
  await expect(page.getByLabel('Giant Horse')).not.toBeVisible()
  await page.getByRole('tab', { name: 'materials' }).click()
  await expect(page.getByLabel('Giant Horse')).not.toBeVisible()
  await page.getByRole('tab', { name: 'equipment' }).click()
  await expect(page.getByLabel('Giant Horse')).not.toBeVisible()
  await page.getByRole('tab', { name: 'creatures' }).click()
  await expect(page.getByLabel('Giant Horse')).toBeVisible()

  // toggle modal
  await page.getByLabel('Giant Horse').click()
  await expect(page.getByRole('heading', { name: 'Drops' })).toBeVisible()
  await page.getByRole('button', { name: 'Close' }).click()
  await expect(page.getByRole('heading', { name: 'Drops' })).not.toBeVisible()
})

test('should support typical search actions', async ({ page }) => {
  await page.goto('/compendium')

  // open search form and input keywords
  await page.getByLabel('search', { exact: true }).click()
  await page.getByPlaceholder('Search').fill('ho')

  /**
   * category notes
   * 'creatures': horse, fairy
   * 'materials': honey
   */
  // switch to a tab
  await page.getByRole('tab', { name: 'creatures' }).click()
  await expect(page.getByLabel('Fairy')).not.toBeVisible() // 'fairy' is fittered out by the search input 'ho'
  await expect(page.getByLabel('Courser Bee Honey')).not.toBeVisible() // 'honey' is not in the 'creatures' tab
  await page.getByLabel('Giant Horse').click()
  await page.getByRole('button', { name: 'Close', exact: true }).click()
  // switch to another tab
  await page.getByRole('tab', { name: 'materials' }).click()
  await expect(page.getByLabel('Giant Horse')).not.toBeVisible() // 'horse' is not in the 'materials' tab
  await page.getByLabel('Courser Bee Honey').click()
  await page.getByRole('button', { name: 'Close', exact: true }).click()

  // close search form
  await page.getByLabel('close', { exact: true }).click()
  // now any entry should be accessible
  await page.getByRole('tab', { name: 'creatures' }).click()
  await page.getByLabel('Fairy').click()
  await page.getByRole('button', { name: 'Close', exact: true }).click()
})
