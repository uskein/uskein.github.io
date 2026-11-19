export default async function run(page) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('file:///D:/Users/Cyborg/Desktop/Docker/Uskein-Studio-Brochure/index.html');
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 700) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'D:/Users/Cyborg/Desktop/Docker/Uskein-Studio-Brochure/Artefactos/qa/qa-final.png', fullPage: true });
  return await page.evaluate(() => ({
    theme: document.documentElement.dataset.theme,
    imgs: Array.from(document.querySelectorAll('.product-card img')).filter(i => i.complete && i.naturalWidth > 0).length,
    video: !!document.querySelector('video')
  }));
}
