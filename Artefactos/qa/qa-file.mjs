export default async function run(page) {
  const base = 'file:///D:/Users/Cyborg/Desktop/Docker/Uskein-Studio-Brochure/';
  const out = {};
  await page.goto(base + 'index.html');
  await page.waitForTimeout(500);
  out.hub = await page.evaluate(() => ({
    theme: document.documentElement.dataset.theme,
    cards: document.querySelectorAll('.product-card').length,
    chips: document.querySelectorAll('.chip').length,
    imgsLoaded: Array.from(document.querySelectorAll('.product-card img')).filter(i => i.complete && i.naturalWidth > 0).length,
    video: !!document.querySelector('video source[src*="promo.mp4"]')
  }));
  await page.locator('.product-card').first().click();
  await page.waitForTimeout(400);
  out.pdp = await page.evaluate(() => ({
    url: location.href.split('/').slice(-2).join('/'),
    title: document.querySelector('h1')?.textContent,
    features: document.querySelectorAll('.feature-item').length,
    heroImgLoaded: (() => { const i = document.querySelector('.pdp-visual img'); return !!i && i.complete && i.naturalWidth > 0; })(),
    theme: document.documentElement.dataset.theme
  }));
  await page.screenshot({ path: 'D:/Users/Cyborg/Desktop/Docker/Uskein-Studio-Brochure/Artefactos/qa/qa-file-pdp.png' });
  return out;
}
