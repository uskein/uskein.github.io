export default async function run(page) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('file:///D:/Users/Cyborg/Desktop/Docker/Uskein-Studio-Brochure/index.html');
  await page.locator('#servicios').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.locator('#servicios').screenshot({ path: 'D:/Users/Cyborg/Desktop/Docker/Uskein-Studio-Brochure/Artefactos/qa/qa-servicios.png' });
  return { ok: true };
}
