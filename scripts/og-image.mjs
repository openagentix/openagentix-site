// Renders the social card (build/og.png, 1200x630) from an SVG with the brand fonts,
// using the Chromium that Playwright installs. No external service.
import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const out = resolve(process.argv[2] ?? 'build', 'og.png');
const font = (f) => `data:font/woff2;base64,${readFileSync(resolve('static/fonts', f)).toString('base64')}`;

const html = `<!doctype html><html><head><style>
@font-face{font-family:'Public Sans';src:url(${font('PublicSans-Variable.woff2')}) format('woff2');font-weight:100 900}
@font-face{font-family:'JetBrains Mono';src:url(${font('JetBrainsMono-Variable.woff2')}) format('woff2');font-weight:100 800}
html,body{margin:0;width:1200px;height:630px}
</style></head><body>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs>
<pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#5DB8DB" stroke-opacity=".08"/></pattern>
<radialGradient id="r" cx="85%" cy="10%" r="70%"><stop offset="0" stop-color="#5DB8DB" stop-opacity=".22"/><stop offset="1" stop-color="#5DB8DB" stop-opacity="0"/></radialGradient>
</defs>
<rect width="1200" height="630" fill="#0D1115"/><rect width="1200" height="630" fill="url(#g)"/><rect width="1200" height="630" fill="url(#r)"/>
<g transform="translate(80 84)">
<rect width="56" height="56" rx="14" fill="#5DB8DB"/>
<g fill="#071319"><circle cx="15" cy="28" r="6.3"/><circle cx="41" cy="28" r="6.3"/></g>
<path d="M21 28h14M28 18.5v19" stroke="#071319" stroke-width="4.2" stroke-linecap="round"/>
<text x="76" y="40" font-family="Public Sans" font-size="34" letter-spacing="-.3"><tspan fill="#B3BECA" font-weight="500">Open</tspan><tspan fill="#E5EAEF" font-weight="650">Agentix</tspan></text>
</g>
<text font-family="Public Sans" font-weight="650" font-size="68" letter-spacing="-2.4" fill="#E5EAEF">
<tspan x="80" y="268">Run AI agents on your own</tspan><tspan x="80" y="346">Kubernetes, under your rules.</tspan></text>
<text font-family="Public Sans" font-size="27" fill="#B3BECA"><tspan x="80" y="420">Own model key and budget per agent. Approved tools only.</tspan><tspan x="80" y="458">Outbound access denied unless allowed. Open source.</tspan></text>
<g font-family="JetBrains Mono" font-size="21">
<rect x="80" y="506" width="520" height="56" rx="12" fill="#151B21" stroke="#252E37"/>
<text x="104" y="541" fill="#5DB8DB">$ <tspan fill="#E5EAEF">PROFILE=quickstart ./install.sh</tspan></text>
<text x="1120" y="541" text-anchor="end" fill="#8C99A6">Apache-2.0 · MCP · A2A · OpenTelemetry</text>
</g>
</svg></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
writeFileSync(out, await page.screenshot({ type: 'png' }));
await browser.close();
console.log(`og-image: wrote ${out}`);
