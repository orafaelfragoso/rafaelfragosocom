import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.describe('Accessibility Tests', () => {
  test('should not have any automatically detectable accessibility issues on homepage', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(1000) // Wait for animations to complete

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('should not have any automatically detectable accessibility issues on about page', async ({ page }) => {
    await page.goto('/about')
    await page.waitForTimeout(1000) // Wait for animations to complete

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('should not have any automatically detectable accessibility issues on uses page', async ({ page }) => {
    await page.goto('/uses')
    await page.waitForTimeout(1000) // Wait for animations to complete

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('should not have any automatically detectable accessibility issues on hire-me page', async ({ page }) => {
    await page.goto('/hire-me')
    await page.waitForTimeout(1000) // Wait for animations to complete

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const h1Count = await page.locator('h1').count()
    expect(h1Count).toBeGreaterThan(0)

    const h1Index = await page
      .locator('h1')
      .first()
      .evaluate((el) => {
        const allHeadings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
        return allHeadings.indexOf(el)
      })

    const h2Elements = await page.locator('h2').count()
    if (h2Elements > 0) {
      const h2Index = await page
        .locator('h2')
        .first()
        .evaluate((el) => {
          const allHeadings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
          return allHeadings.indexOf(el)
        })

      expect(h2Index).toBeGreaterThanOrEqual(h1Index)
    }
  })

  test('all images should have alt text', async ({ page }) => {
    await page.goto('/')

    const images = await page.locator('img').all()
    for (const img of images) {
      const alt = await img.getAttribute('alt')
      expect(alt).not.toBeNull()
      expect(alt?.trim().length).toBeGreaterThan(0)
    }
  })

  test('all links should have accessible names', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000) // Wait for animations

    // Collect all link information in a single evaluate to avoid staleness issues
    const linkData = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a')).map((link) => {
        const ariaLabel = link.getAttribute('aria-label')
        const textContent = link.textContent?.trim() || ''
        const img = link.querySelector('img')
        const imgAlt = img?.getAttribute('alt') || null

        return {
          href: link.getAttribute('href'),
          ariaLabel,
          textContent,
          imgAlt,
          html: link.innerHTML,
        }
      })
    })

    for (const link of linkData) {
      const hasVisibleText = link.textContent.length > 0
      const hasAccessibleName = link.ariaLabel || hasVisibleText || link.imgAlt

      if (!hasAccessibleName) {
        console.error(`Link without accessible name: href="${link.href}", content="${link.html}"`)
      }

      expect(hasAccessibleName).toBeTruthy()
    }
  })

  test('skip to main content link should be accessible', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const skipLink = page.locator('a[href="#main-content"]')

    await skipLink.focus()
    await expect(skipLink).toBeVisible()

    // Use keyboard navigation to avoid pointer event interception
    await page.keyboard.press('Enter')
    await page.waitForTimeout(100) // Small delay for scroll

    const mainContent = page.locator('#main-content')
    await expect(mainContent).toBeInViewport()
  })
})
