// Regression: local assets must load in both levels of iframe under file://.
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
(async () => {
  const browser = await chromium.launch({channel: 'chrome', headless: true});
  try {
    const page = await browser.newPage();
    const root = process.env.ATLAS_ROOT || path.resolve(__dirname, '../../build/atlas');
    const url = relative => pathToFileURL(path.join(root, relative)).href;
    async function imageLoaded(locator) {
      await locator.waitFor({state: 'visible'});
      await locator.evaluate(image => image.decode());
      assert(await locator.evaluate(image => image.naturalWidth > 0 && image.naturalHeight > 0));
    }
    await page.goto(url('recipes/image-e076/preview.html'));
    await imageLoaded(page.locator('img').first());
    await page.goto(url('recipes/image-e076/index.html'));
    await imageLoaded(page.frameLocator('.preview-frame iframe').locator('img').first());
    await page.goto(url('index.html'));
    await page.locator('#search').fill('image-e076');
    const preview = page.frameLocator('.feed-card[data-id="image-e076"] > iframe')
      .frameLocator('.preview-frame iframe');
    await imageLoaded(preview.locator('img').first());
    console.log('image-e076: local image loads in preview, recipe card, and atlas feed');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
