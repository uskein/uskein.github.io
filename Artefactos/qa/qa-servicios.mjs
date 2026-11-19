export default async function run(page) {
  await page.goto('file:///D:/Users/Cyborg/Desktop/Docker/Uskein-Studio-Brochure/index.html');
  return await page.evaluate(() => {
    const wa = Array.from(document.querySelectorAll('[data-wa]')).slice(0, 3).map(a => a.href);
    return {
      theme: document.documentElement.dataset.theme,
      servicios: !!document.querySelector('#servicios'),
      navServicios: !!document.querySelector('.nav a[href="#servicios"]'),
      wa,
      cards: document.querySelectorAll('.product-card').length,
      servicesCards: document.querySelectorAll('#servicios .value').length
    };
  });
}
