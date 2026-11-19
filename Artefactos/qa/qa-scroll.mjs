export default async function run(page) {
  await page.evaluate(() => document.querySelector('#catalogo').scrollIntoView());
  await page.waitForTimeout(1200);
  return await page.evaluate(() => ({
    loaded: Array.from(document.querySelectorAll('.product-card img')).filter(i => i.complete && i.naturalWidth > 0).length,
    total: document.querySelectorAll('.product-card img').length,
    heroLoaded: (() => { const i = document.querySelector('.hero__media img'); return !!i && i.complete && i.naturalWidth > 0; })()
  }));
}
