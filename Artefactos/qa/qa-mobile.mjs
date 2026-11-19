export default async function run(page) {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:8080/');
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'D:/Users/Cyborg/Desktop/Docker/Uskein-Studio-Brochure/Artefactos/qa-mobile-2.png', fullPage: false });
  return { theme: await page.evaluate(() => document.documentElement.dataset.theme) };
}
