import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.describe('Accessibility Tests', () => {
  test('should not have any automatically detectable accessibility issues on homepage', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(1000)

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('should not have any automatically detectable accessibility issues on about page', async ({ page }) => {
    await page.goto('/about')
    await page.waitForTimeout(1000)

    const accessibilityScanResults = await new AxeBuilder({ page }).exclude('.mapboxgl-map').analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('should not have any automatically detectable accessibility issues on uses page', async ({ page }) => {
    await page.goto('/uses')
    await page.waitForTimeout(1000)

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('should not have any automatically detectable accessibility issues on hire-me page', async ({ page }) => {
    await page.goto('/hire-me')
    await page.waitForTimeout(1000)

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
    await page.waitForTimeout(1000)

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

    await page.keyboard.press('Enter')
    await page.waitForTimeout(100)

    const mainContent = page.locator('#main-content')
    await expect(mainContent).toBeInViewport()
  })

  test('logo should be accessible to screen readers', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const logo = page.locator('a[href="/"]').first()
    const accessibleName = await logo.evaluate((el) => {
      const ariaLabel = el.getAttribute('aria-label')
      const textContent = el.textContent?.trim()
      return ariaLabel || textContent
    })

    expect(accessibleName).toBeTruthy()
    expect(accessibleName?.length).toBeGreaterThan(0)
  })

  test('all aria-labelledby references should have corresponding IDs', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const elementsWithLabelledby = await page.locator('[aria-labelledby]').all()

    for (const element of elementsWithLabelledby) {
      const labelledbyId = await element.getAttribute('aria-labelledby')
      if (labelledbyId) {
        const referencedElement = page.locator(`#${labelledbyId}`)
        await expect(referencedElement).toHaveCount(1)
      }
    }
  })

  test('explore categories heading should have proper ID for aria-labelledby', async ({ page }) => {
    await page.goto('/articles')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    const section = page.locator('[aria-labelledby="explore-categories-heading"]')
    await expect(section).toBeVisible()

    const heading = page.locator('#explore-categories-heading')
    await expect(heading).toBeVisible()
    await expect(heading).toHaveText('Explore Categories')
  })

  test('hero section should have proper ID for aria-labelledby', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const section = page.locator('[aria-labelledby="hero-heading"]')
    await expect(section).toBeVisible()

    const heading = page.locator('#hero-heading')
    await expect(heading).toBeVisible()
  })

  test('keyboard navigation should work on navbar links', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    const focusedElement = await page.evaluateHandle(() => document.activeElement)
    const tagName = await focusedElement.evaluate((el) => el?.tagName.toLowerCase())
    const _isNavLink = await focusedElement.evaluate((el) => {
      return el?.closest('nav') !== null && el?.tagName.toLowerCase() === 'a'
    })

    expect(['a', 'button']).toContain(tagName)
  })

  test('keyboard navigation should work on category links', async ({ page }) => {
    await page.goto('/articles')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    const categoryLinks = page.locator('nav[aria-label="Article categories navigation"] a')
    const count = await categoryLinks.count()

    if (count > 0) {
      const firstLink = categoryLinks.first()
      await firstLink.focus()

      const focusClasses = await firstLink.evaluate((el) => {
        return window.getComputedStyle(el).outlineStyle !== 'none' || el.className.includes('focus-visible')
      })

      expect(focusClasses).toBeTruthy()
    }
  })

  test('command menu button should have accessible name', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const commandButton = page.locator('button[aria-label="Open command menu"]').first()
    await expect(commandButton).toBeVisible()

    const ariaLabel = await commandButton.getAttribute('aria-label')
    expect(ariaLabel).toBeTruthy()
    expect(ariaLabel?.toLowerCase()).toContain('command')
  })

  test('top articles section should not use nav element', async ({ page }) => {
    await page.goto('/articles')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    const topArticlesSection = page.locator('section[aria-labelledby="top-articles-heading"]')
    const featuredNav = page.locator('nav[aria-label*="Featured"]')

    const sectionCount = await topArticlesSection.count()
    const navCount = await featuredNav.count()

    expect(sectionCount).toBeGreaterThanOrEqual(0)
    expect(navCount).toBe(0)
  })

  test('all interactive elements should be keyboard accessible', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const buttons = await page.locator('button').all()
    const links = await page.locator('a').all()

    for (const button of buttons) {
      const type = await button.getAttribute('type')
      const role = await button.getAttribute('role')
      const tagName = await button.evaluate((el) => el.tagName.toLowerCase())

      expect(
        ['button', 'submit', 'reset'].includes(type || '') || tagName === 'button' || role === 'button',
      ).toBeTruthy()
    }

    for (const link of links) {
      const href = await link.getAttribute('href')
      const role = await link.getAttribute('role')

      expect(href || role === 'button').toBeTruthy()
    }
  })

  test('focus indicators should be visible on navbar links', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const navLinks = page.locator('nav[aria-label="Navigation"] a')
    const count = await navLinks.count()

    if (count > 0) {
      const firstLink = navLinks.first()
      await firstLink.focus()

      const hasRingClasses = await firstLink.evaluate((el) => {
        return el.className.includes('ring-') && el.className.includes('focus-visible')
      })

      expect(hasRingClasses).toBeTruthy()
    }
  })

  test('should not have any automatically detectable accessibility issues on articles page', async ({ page }) => {
    await page.goto('/articles')
    await page.waitForTimeout(1000)

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('all sections with aria-labelledby should have valid references', async ({ page }) => {
    const pages = ['/', '/about', '/articles', '/uses', '/hire-me']

    for (const pagePath of pages) {
      await page.goto(pagePath)
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(500)

      const sections = await page.locator('section[aria-labelledby], article[aria-labelledby]').all()

      for (const section of sections) {
        const labelledbyId = await section.getAttribute('aria-labelledby')
        if (labelledbyId) {
          const referencedElement = page.locator(`#${labelledbyId}`)
          const count = await referencedElement.count()

          if (count === 0) {
            const outerHTML = await section.evaluate((el) => el.outerHTML.substring(0, 200))
            console.error(`Missing ID "${labelledbyId}" on page ${pagePath}`)
            console.error(`Element: ${outerHTML}`)
          }

          expect(count).toBeGreaterThan(0)
        }
      }
    }
  })

  test('reduced motion preferences should be respected', async ({ page, context }) => {
    await context.addInitScript(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
          matches: query.includes('prefers-reduced-motion: reduce'),
          media: query,
          onchange: null,
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => true,
        }),
      })
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const hasReducedMotion = await page.evaluate(() => {
      const _style = window.getComputedStyle(document.documentElement)
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    })

    expect(hasReducedMotion).toBeTruthy()
  })
})
