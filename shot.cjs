const puppeteer = require('puppeteer');
(async () => {
  const b = await puppeteer.launch();
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 800 });
  await p.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await p.screenshot({ path: 'shot.png' });
  // hover the secondary button
  const sec = await p.$('a.group');
  await sec.hover();
  await p.waitForTimeout(500);
  await p.screenshot({ path: 'shot_hover.png' });
  await b.close();
})();
