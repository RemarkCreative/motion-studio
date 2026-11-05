// Usage: node render.mjs videos/hello.html [--stills 3]
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { resolve, basename, extname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

// Playwright is installed globally on this machine; createRequire honors NODE_PATH, ESM import does not.
const { chromium } = createRequire(import.meta.url)('playwright');

const FPS = 30;
const args = process.argv.slice(2);
const file = args.find(a => !a.startsWith('--'));
const si = args.indexOf('--stills');
const stills = si >= 0 ? parseInt(args[si + 1], 10) : 0;
if (!file || (si >= 0 && !(stills > 0))) {
  console.error('Usage: node render.mjs videos/<name>.html [--stills N]');
  process.exit(1);
}

const name = basename(file, extname(file));
const outDir = resolve('out');
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(resolve(file)).href);
  // Guard against CSS animations/transitions sneaking in; frames must depend on t only.
  await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important}' });
  await page.evaluate(() => document.fonts.ready);

  const { DURATION, SIZE, hasRender } = await page.evaluate(() => ({
    DURATION: window.DURATION, SIZE: window.SIZE, hasRender: typeof window.render === 'function',
  }));
  if (!(DURATION > 0) || !Array.isArray(SIZE) || SIZE.length !== 2 || !hasRender) {
    throw new Error(`${file} must set window.DURATION (> 0), window.SIZE ([w, h]) and window.render(t)`);
  }
  const [w, h] = SIZE;
  await page.setViewportSize({ width: w, height: h });

  const frames = Math.round(DURATION * FPS);
  const shot = async t => {
    await page.evaluate(t => window.render(t), t);
    return page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: w, height: h } });
  };

  if (stills) {
    // Spread evenly from the first frame to the last frame.
    const last = frames - 1;
    for (let k = 0; k < stills; k++) {
      const i = stills === 1 ? Math.floor(last / 2) : Math.round((k * last) / (stills - 1));
      const out = join(outDir, `${name}-still-${k + 1}.png`);
      await page.evaluate(t => window.render(t), i / FPS);
      await page.screenshot({ path: out, clip: { x: 0, y: 0, width: w, height: h } });
      console.log(`still ${k + 1}/${stills} at t=${(i / FPS).toFixed(2)}s -> ${out}`);
    }
  } else {
    const out = join(outDir, `${name}.mp4`);
    const ff = spawn('ffmpeg', [
      '-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
      '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-movflags', '+faststart', out,
    ], { stdio: ['pipe', 'inherit', 'inherit'] });
    const done = new Promise((ok, fail) => {
      ff.on('error', fail);
      ff.on('close', code => (code === 0 ? ok() : fail(new Error(`ffmpeg exited with ${code}`))));
    });
    for (let i = 0; i < frames; i++) {
      const png = await shot(i / FPS);
      if (!ff.stdin.write(png)) await new Promise(r => ff.stdin.once('drain', r));
      if (i % FPS === 0 || i === frames - 1) process.stdout.write(`\rframe ${i + 1}/${frames}`);
    }
    ff.stdin.end();
    await done;
    console.log(`\n${frames} frames @ ${FPS}fps -> ${out}`);
  }
} finally {
  await browser.close();
}
