const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const {pathToFileURL} = require('node:url');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({channel:'chrome',headless:true});
  try {
    const page=await browser.newPage({viewport:{width:1280,height:900}});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(pathToFileURL('/tmp/hacksidian-atlas-en-fixture/index.html').href);
    await page.waitForSelector('#results a');
    assert.equal(await page.locator('html').getAttribute('lang'),'en');
    assert.equal(await page.locator('label[for=search]').textContent(),'Find a technique');
    assert.equal(await page.locator('#results-count').textContent(),'1 found');
    assert.equal(await page.locator('#results a strong').textContent(),'Example');
    await page.locator('#results a').click();
    const recipe=page.frameLocator('#feed iframe').first();
    await recipe.locator('h1').waitFor();
    assert.equal(await recipe.locator('h1').textContent(),'Example');
    assert.equal(await recipe.locator('html').getAttribute('lang'),'en');
    assert((await recipe.locator('.explanation').textContent()).includes('Purpose'));
    assert((await recipe.locator('a[href^="obsidian:"]').getAttribute('href')).includes('Description.en.md'));
    await page.setViewportSize({width:375,height:800});
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    await page.goto(pathToFileURL(path.resolve(__dirname,'../../build/atlas/index.html')).href);
    await page.waitForSelector('#results a');
    assert.equal(await page.locator('html').getAttribute('lang'),'ru');
    assert.equal(await page.locator('#results a').count(),JSON.parse(require('node:fs').readFileSync(path.resolve(__dirname,'../../build/atlas/build-report.json'),'utf8')).techniques);
    assert.equal(await page.locator('label[for=search]').textContent(),'Найти приём');
    assert.deepEqual(errors,[]);
    console.log('PASS: English shell, description, iframe language, native link, mobile width; complete Russian catalogue; no JS errors');
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
