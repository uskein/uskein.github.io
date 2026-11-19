export default async function run(page, ui) {
  const out = {};

  // Hub: filtros
  await page.goto('http://localhost:8080/');
  await page.locator('.chip[data-filter="bienestar"]').click();
  out.filterBienestar = await page.locator('.product-card:not([hidden])').count();
  out.filterPressed = await page.locator('.chip[aria-pressed="true"]').innerText();

  // Tema
  const before = await page.evaluate(() => document.documentElement.dataset.theme);
  await page.locator('.theme-toggle').click();
  const after = await page.evaluate(() => document.documentElement.dataset.theme);
  out.theme = { before, after, changed: before !== after };

  // Ficha
  await page.goto('http://localhost:8080/productos/habitos/');
  out.pdp = {
    title: await page.locator('h1').innerText(),
    features: await page.locator('.feature-item').count(),
    shots: await page.locator('.shot').count(),
    breadcrumb: (await page.locator('.breadcrumb').innerText()).replace(/\s+/g, ' ')
  };

  // Móvil
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:8080/');
  out.mobile = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    menuVisible: getComputedStyle(document.querySelector('.menu-toggle')).display,
    navHidden: getComputedStyle(document.querySelector('.nav')).display
  }));
  await page.screenshot({ path: 'D:/Users/Cyborg/Desktop/Docker/Uskein-Studio-Brochure/Artefactos/qa-mobile.png', fullPage: false });

  return out;
}
