import { test, expect } from '@playwright/test'

test('Page loads correctly', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Most popular Books of All time')).toBeVisible()
})

test('Pagination works correctly', async ({ page }) => {
  await page.goto('/')

  // Check element count
  const list = page.locator('.bookList')
  await expect(list).toBeVisible()
  expect(await list.locator('.book').count(), 'Pagination shows five elements').toEqual(5)

  // Pagination
  const paginationLocator = page.locator('.pagination')
  const chevronRight = paginationLocator.getByRole('button').last()
  const chevronLeft = paginationLocator.getByRole('button').first()

  await expect(
    paginationLocator.getByText('Page 1 of 5'),
    'Pagination displays current page',
  ).toBeVisible()

  // Check pagination cannot be less than 1
  await chevronLeft.click()
  await expect(
    paginationLocator.getByText('Page 1 of 5'),
    'Pagination cannot be less than 1',
  ).toBeVisible()

  // Check pagination can be incremented
  await chevronRight.click()
  await expect(
    paginationLocator.getByText('Page 2 of 5'),
    'Pagination can change to the next page',
  ).toBeVisible()

  // Check pagination can return to last page
  await chevronLeft.click()
  await expect(
    paginationLocator.getByText('Page 1 of 5'),
    'Pagination can change to the last page',
  ).toBeVisible()

  //TODO we could add more tests to check that it doesn't go over the max number of pages
  //this could also be simplified with Fixtures
})

test('Books are displayed correctly', async ({ page }) => {
  await page.goto('/')

  //Book list
  const list = page.locator('.bookList')
  await expect(list).toBeVisible()

  //First book
  const firstBook = list.locator('.book').first()
  expect(await firstBook.locator('h3').count(), 'Book has author and title').toEqual(2) //This could be obviously more precise
  expect(await firstBook.locator('.bookInfo').count(), 'Book has other attributes').toEqual(3) //This could be obviously more precise
  await expect(
    firstBook.locator('.bookInfo').last(),
    'Book can be purchased in amazon!',
  ).toHaveText('Amazon') //This could be obviously more precise

  // Display synopsis
  const lastBook = list.locator('.book').last()
  const lastBookSynopsis = lastBook.locator('div').last()
  await expect(lastBookSynopsis, 'Synopsis is hidden').toHaveClass('collapse')
  await lastBook.first().click()
  await expect(lastBookSynopsis, 'Synopsis is displayed').toHaveClass('active')
  await lastBook.first().click()
  await expect(lastBookSynopsis, 'Synopsis is hidden again').toHaveClass('collapse')
})
