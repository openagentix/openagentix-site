# openagentix-site

The marketing site of [OpenAgentix](https://github.com/openagentix/openagentix). It is a SvelteKit site,
fully prerendered to static files. Pages ship no framework JavaScript; the only client script is
`static/site.js` (theme toggle, copy buttons, mobile menu). There is no tracking and no cookie.

## Develop

```sh
pnpm install
pnpm dev
```

## Test

| Command              | What it does                                                          |
| -------------------- | --------------------------------------------------------------------- |
| `pnpm lint`          | Prettier check and ESLint                                             |
| `pnpm check`         | svelte-check and type check                                           |
| `pnpm test`          | Unit tests (vitest)                                                   |
| `pnpm test:content`  | Scans the build for em dashes, hype words, emails, trackers          |
| `pnpm test:links`    | Checks internal links and `#fragments` in the build (add `--external` to also report dead external links) |
| `pnpm test:e2e`      | Playwright: smoke, small screens, theme, copy button, axe accessibility |
| `pnpm test:all`      | All of the above in order, including a build                          |

The last three need a build first. `test:e2e` starts `scripts/serve.mjs` itself, or reuses a running one.
Install the browser once with `pnpm exec playwright install chromium`.

## Build and preview

```sh
pnpm build     # static site in build/, plus og.png, sitemap.xml, robots.txt, llms.txt
pnpm preview   # serves build/ on http://localhost:4173 under the base path, with 404.html
```

## Deploy

Pushes to `main` deploy to GitHub Pages through `.github/workflows/deploy.yml`. Pages must be set to
the "GitHub Actions" source in the repository settings.

## Configuration

Set these as repository variables (Settings > Secrets and variables > Actions > Variables). All are optional.
An empty or unset variable falls back to the default.

| Variable    | Meaning                                              | Default                                      |
| ----------- | ---------------------------------------------------- | -------------------------------------------- |
| `SITE_URL`  | Public address of the site                           | `https://openagentix.github.io/openagentix-site` |
| `BASE_PATH` | Path the site is served under                        | Path of `SITE_URL` (empty for a custom domain)   |
| `DOCS_URL`  | Address of the documentation site                    | `https://openagentix.github.io/openagentix`  |

## Refresh the console screenshots

`scripts/capture-screenshots.mjs` captures the web console in demo mode. Its header comment has the steps:
start the console from a checkout of the main repository with `CONSOLE_DEV_FAKE=1`, then run
`node scripts/capture-screenshots.mjs`. It needs `cwebp`, `avifenc` and `magick` on your PATH.

## Switch to the custom domain openagentix.org

1. DNS at the registrar. For the apex `openagentix.org`, add A records
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` and AAAA records
   `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.
   For `www`, add a CNAME to `openagentix.github.io`.
2. Recommended: first verify the domain for the `openagentix` organisation in GitHub settings.
3. Set the repository variable `SITE_URL=https://openagentix.org`. `BASE_PATH` then defaults to empty.
4. In Settings > Pages set the custom domain to `openagentix.org`, or run
   `gh api -X PUT repos/openagentix/openagentix-site/pages -f cname=openagentix.org`.
   Wait for the certificate, enable Enforce HTTPS, then re-run the deploy workflow.
   `www` redirects to the apex on its own.

## Licence

- Code: Apache-2.0 (see `LICENSE`)
- Written content and screenshots: CC BY 4.0
- Fonts: SIL OFL 1.1 (see `static/fonts`)

Third-party packages are listed in `THIRD-PARTY.md`. See `NOTICE`.
